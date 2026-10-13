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
   - Leave `notes` blank.

5. Use `notes` for anything else (e.g., "corner is cut off", "hard to see, only visible in shadow").

## Format

Use the template in `template.csv` as a reference. Notes can contain commas; just quote the whole note in the CSV.
