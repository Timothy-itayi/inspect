# Labelling guide

## How to label

1. For each photo, add a row in `template.csv` for each of the six issue types (mould-signs, damp-signs, crack-signs, water-entry-signs, blind-cord-loop, window-covering-damage).

2. For each row, set `present` to `y` or `n`.
   - `y` means the issue is in the photo
   - `n` means it is not

3. If `present` is `y`:
   - Mark the clearest patch with a box: set `x`, `y` (top-left corner), `w` (width), `h` (height).
   - All values are from 0 to 1, where 1 is the full photo width or height.
   - If there are other patches, mention them in `notes` (optional).

4. If `present` is `n`:
   - Leave `x`, `y`, `w`, `h` blank.

5. Use `notes` for anything else (e.g., "corner is cut off", "hard to see, only visible in shadow").

## Rules the checker enforces

- The first line is exactly `photo_id,issue_type,present,x,y,w,h,notes`.
- Every row has 8 columns (so a blank `n` row looks like `photo-001,damp-signs,n,,,,,`).
- `photo_id` is the photo's file name without the extension (`kitchen-03` for `kitchen-03.jpg`): letters, numbers and dashes, no spaces.
- The sheet has at least one label row under the header (an empty sheet is an error).
- Each photo has each of the six issue types exactly once.
- `present` is `y` or `n`.
- For `y`: `x`, `y`, `w`, `h` are numbers from 0 to 1, `w` and `h` are above 0, and the box stays inside the photo (`x + w` and `y + h` are 1 or less).
- For `n`: `x`, `y`, `w`, `h` are blank. `notes` can still be used.
- Numbers are plain decimals like `0`, `0.25` or `.5`. No `1e-1`, no spaces.
- A quote mark may only wrap a whole note (`"like, this"`), never sit in the middle of a word.

## Check your sheet

From the `evals/` folder, run:

    pnpm run validate labels/your-file.csv

It prints each problem with its line number, or `OK` if the sheet is good. Fix every problem before using the labels.

## Format

Use the template in `template.csv` as a reference. Notes can contain commas; just quote the whole note in the CSV.
