import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HEADER = "photo_id,issue_type,present,x,y,w,h,notes";

type Row = { line: number; fields: string[] };

// Minimal RFC 4180: quoted fields, "" for a quote, CRLF or LF, blank lines skipped.
function parseCsv(text: string): { rows: Row[]; errors: string[] } {
	const rows: Row[] = [];
	const errors: string[] = [];
	let fields: string[] = [];
	let field = "";
	let quoted = false;
	let closed = false; // a quoted field just ended; only , or a line break may follow
	let line = 1;
	let startLine = 1;
	const endRow = () => {
		fields.push(field);
		if (fields.length > 1 || fields[0] !== "") rows.push({ line: startLine, fields });
		fields = [];
		field = "";
	};
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (quoted) {
			if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
			else if (c === '"') { quoted = false; closed = true; }
			else { field += c; if (c === "\n") line++; }
		} else if (c === ",") { fields.push(field); field = ""; closed = false; }
		else if (c === "\n") { endRow(); line++; startLine = line; closed = false; }
		else if (c === "\r") continue;
		else if (c === '"' && field === "" && !closed) quoted = true;
		else if (c === '"' || closed) { errors.push(`line ${line}: a quote can only wrap a whole field`); closed = false; }
		else field += c;
	}
	if (quoted) errors.push(`line ${startLine}: unterminated quote`);
	else endRow();
	return { rows, errors: [...new Set(errors)] };
}

// Plain decimals only: 0, 1, 0.25, .5. No exponents, hex, spaces, NaN or Infinity.
const isNum = (s: string) => /^(\d+\.?\d*|\.\d+)$/.test(s);

export function validateLabels(csvText: string, issueTypes: readonly string[]): string[] {
	const { rows, errors } = parseCsv(csvText.replace(/^\uFEFF/, "")); // spreadsheets add a BOM
	if (errors.length) return errors;
	const [header, ...body] = rows;
	if (!header || header.fields.join(",") !== HEADER) {
		return [`line 1: header must be exactly ${HEADER}`];
	}
	if (body.length === 0) return ["line 1: no label rows yet"];
	const seen = new Map<string, Map<string, number>>(); // photo -> type -> line of first row
	const photoLine = new Map<string, number>();
	for (const { line, fields } of body) {
		const err = (msg: string) => errors.push(`line ${line}: ${msg}`);
		if (fields.length !== 8) { err(`expected 8 fields, found ${fields.length}`); continue; }
		const [photo, type, present, ...box] = fields;
		if (photo === "" || photo !== photo.trim()) err("photo_id must not be blank or start/end with spaces");
		if (!issueTypes.includes(type)) err(`unknown issue_type "${type}"`);
		if (present === "y") {
			const [x, y, w, h] = box.slice(0, 4).map(Number);
			if (!box.slice(0, 4).every(isNum) || [x, y, w, h].some((n) => n < 0 || n > 1)) {
				err("x, y, w, h must all be numbers from 0 to 1");
			} else if (w <= 0 || h <= 0) err("w and h must be greater than 0");
			else if (x + w > 1 || y + h > 1) err("box goes outside the photo (x+w and y+h must be 1 or less)");
		} else if (present === "n") {
			if (box.slice(0, 4).some((v) => v !== "")) err("x, y, w, h must be blank when present is n");
		} else err(`present must be y or n, found "${present}"`);
		if (photo && issueTypes.includes(type)) {
			const counts = seen.get(photo) ?? new Map<string, number>();
			const first = counts.get(type);
			if (first) err(`photo ${photo} has ${type} again (first on line ${first})`);
			else counts.set(type, line);
			seen.set(photo, counts);
			if (!photoLine.has(photo)) photoLine.set(photo, line);
		}
	}
	for (const [photo, counts] of seen) {
		const line = photoLine.get(photo);
		for (const t of issueTypes) {
			if (!counts.has(t)) errors.push(`line ${line}: photo ${photo} is missing ${t}`);
		}
	}
	return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	const file = process.argv[2];
	if (!file) { console.error("Usage: node validate.ts <labels.csv>"); process.exit(1); }
	let text: string;
	let types: string[];
	try {
		text = readFileSync(file, "utf8");
		types = JSON.parse(readFileSync(new URL("./labels/issue-types.json", import.meta.url), "utf8"));
	} catch (e) {
		console.error(`Could not read file: ${(e as Error).message}`);
		process.exit(1);
	}
	const errors = validateLabels(text, types);
	if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
	const { rows } = parseCsv(text);
	console.log(`OK: ${new Set(rows.slice(1).map((r) => r.fields[0])).size} photos, ${rows.length - 1} rows`);
}
