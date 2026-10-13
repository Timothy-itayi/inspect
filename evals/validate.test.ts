import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateLabels } from "./validate.ts";

const T = ["a", "b"];
const H = "photo_id,issue_type,present,x,y,w,h,notes";
const check = (rows: string[], expected: string[], eol = "\n") =>
	assert.deepEqual(validateLabels([H, ...rows].join(eol) + eol, T), expected);
const ok = ["p,a,n,,,,,", "p,b,n,,,,,"];

describe("validateLabels", () => {
	it("real template passes", () => {
		const types = JSON.parse(readFileSync(new URL("./labels/issue-types.json", import.meta.url), "utf8"));
		const csv = readFileSync(new URL("./labels/template.csv", import.meta.url), "utf8");
		assert.deepEqual(validateLabels(csv, types), []);
	});
	it("accepts a file starting with a BOM", () => {
		const types = JSON.parse(readFileSync(new URL("./labels/issue-types.json", import.meta.url), "utf8"));
		const csv = readFileSync(new URL("./labels/template.csv", import.meta.url), "utf8");
		assert.deepEqual(validateLabels("\uFEFF" + csv, types), []);
	});
	it("accepts CRLF and quoted notes with commas and quotes", () => {
		check(['p,a,y,0.1,0.1,0.5,0.5,"dark, ""bad"" corner"', "p,b,n,,,,,", ""], [], "\r\n");
	});
	it("rejects a bad header", () => {
		assert.deepEqual(validateLabels("photo,type\n", T), [`line 1: header must be exactly ${H}`]);
	});
	it("rejects a short row", () => {
		check(["p,a,n,,,", "p,b,n,,,,,"], ["line 2: expected 8 fields, found 6", "line 3: photo p is missing a"]);
	});
	it("rejects unknown issue type", () => {
		check(["p,zzz,n,,,,,", ...ok], ['line 2: unknown issue_type "zzz"']);
	});
	it("rejects out-of-range region", () => {
		check(["p,a,y,0.8,0,0.5,0.5,", "p,b,n,,,,,"], ["line 2: box goes outside the photo (x+w and y+h must be 1 or less)"]);
		check(["p,a,y,2,0,0.5,0.5,", "p,b,n,,,,,"], ["line 2: x, y, w, h must all be numbers from 0 to 1"]);
	});
	it("rejects region on a 'n' row", () => {
		check(["p,a,n,0.1,,,,", "p,b,n,,,,,"], ["line 2: x, y, w, h must be blank when present is n"]);
	});
	it("rejects missing region on a 'y' row", () => {
		check(["p,a,y,,,,,", "p,b,n,,,,,"], ["line 2: x, y, w, h must all be numbers from 0 to 1"]);
	});
	it("rejects bad present value", () => {
		check(["p,a,maybe,,,,,", "p,b,n,,,,,"], ['line 2: present must be y or n, found "maybe"']);
	});
	it("rejects photo missing a type", () => {
		check(["p,a,n,,,,,"], ["line 2: photo p is missing b"]);
	});
	it("rejects photo with duplicate type", () => {
		check([...ok, "p,a,n,,,,,"], ["line 4: photo p has a again (first on line 2)"]);
	});
	it("rejects an unterminated quote", () => {
		check(['p,a,n,,,,,"oops'], ["line 2: unterminated quote"]);
	});
	it("rejects quotes that do not wrap a whole field", () => {
		check(['p,"a"x,n,,,,,', "p,b,n,,,,,"], ["line 2: a quote can only wrap a whole field"]);
		check(['p,a,"n"x,,,,,', "p,b,n,,,,,"], ["line 2: a quote can only wrap a whole field"]);
		check(['p,a-"x",n,,,,,', "p,b,n,,,,,"], ["line 2: a quote can only wrap a whole field"]);
	});
	it("rejects blank or padded photo_id", () => {
		const msg = "photo_id must not be blank or start/end with spaces";
		check([" ,a,n,,,,,", " ,b,n,,,,,"], ["line 2: " + msg, "line 3: " + msg]);
		check([" p,a,n,,,,,", " p,b,n,,,,,"], ["line 2: " + msg, "line 3: " + msg]);
	});
	it("rejects a sheet with no rows", () => {
		assert.deepEqual(validateLabels(H + "\n", T), ["line 1: no label rows yet"]);
	});
	it("only accepts plain decimals", () => {
		for (const v of ["0", "0.25", ".5"]) check([`p,a,y,${v},0,0.1,0.1,`, "p,b,n,,,,,"], []);
		check(["p,a,y,0,0,1,1,", "p,b,n,,,,,"], []);
		for (const v of ["1e-1", " 0.1", "0.1 ", "0x1", "NaN", "Infinity", "-0.1"]) {
			check([`p,a,y,${v},0,0.1,0.1,`, "p,b,n,,,,,"], ["line 2: x, y, w, h must all be numbers from 0 to 1"]);
		}
	});
});

describe("command line", () => {
	const run = (file: string) => spawnSync(process.execPath, ["validate.ts", file], { cwd: import.meta.dirname, encoding: "utf8" });
	it("template exits 0 and prints OK", () => {
		const r = run("labels/template.csv");
		assert.equal(r.status, 0);
		assert.match(r.stdout, /^OK: 1 photos, 6 rows/);
	});
	it("bad file exits 1 and prints a line error", () => {
		const f = join(mkdtempSync(join(tmpdir(), "labels-")), "bad.csv");
		writeFileSync(f, H + "\np,zzz,n,,,,,\n");
		const r = run(f);
		assert.equal(r.status, 1);
		assert.match(r.stderr, /^line 2: unknown issue_type "zzz"/);
	});
});
