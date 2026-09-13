# Company / school logos

Drop logo image files here and they'll appear next to each entry on the About page.

Expected filenames (referenced in `assets/data.js`):

- `tangam.png`
- `manulife.png`
- `geotab.png`
- `xplore.png`
- `uwaterloo.png`

## Notes
- **Square-ish PNGs with transparent backgrounds** look best (they render in a 22×22 rounded chip).
- Any name works — just make the filename match the `logo:` path in `assets/data.js`.
- If a file is missing, the site automatically falls back to a lettered monogram (e.g. `M` for Manulife), so nothing breaks.
- To use a different format, update the `logo:` path in `data.js` (e.g. `assets/logos/tangam.svg`).

## Where to get logos
Grab official brand assets from each company's press/brand page, or a favicon
(`https://<company-domain>/favicon.ico`) as a quick stand-in.
