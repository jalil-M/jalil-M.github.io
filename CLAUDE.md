# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

Personal portfolio landing page for Jalil Moussa, deployed via GitHub Pages from this repo (`jalil-M.github.io`). Single-page site: a tiled background of dog portraits (8 breeds) whose pupils track the cursor, plus links to LinkedIn / GitHub / resume.

## Architecture

Static site — no build step. GitHub Pages serves the files directly (Jekyll passthrough; no `_config.yml`).

- `index.html` — the entire page. Two background containers (`#dogs` for `<img>` tiles, `#dog-eyes` for the SVG pupil overlay) plus the centered `#intro` block.
- `js/demo.js` — at runtime, builds a jittered grid of `<img>` tiles into `#dogs` and a parallel set of `<circle>` eye-whites + pupils into `#dog-eyes`. On `mousemove` (rAF-throttled), translates each pupil toward the cursor, clamped within its eye-white. Touch fallback uses a sine-wave idle animation.
- `assets/dogs/*.jpg` — 512×512 face crops sourced from dog.ceo (free to use). Each breed's eye coordinates are hand-tuned in the `BREEDS` array in `demo.js` as fractions of the image (`fx`, `fy`). When swapping a photo, re-pick eye fractions there.
- `css/style.css` — `#dogs` photos at 78% opacity with a radial dim overlay so the white intro text reads.
- `resume.pdf` — current resume; older commits show this file is updated in place when the resume is revised.

## Local preview

No package manager or test suite. To preview, open `index.html` directly in a browser, or serve the directory:

```
python3 -m http.server 8000
```

For Jekyll-accurate preview (rarely needed since there's no Jekyll content): `bundle exec jekyll serve`.

## Conventions

- Resume updates are committed with messages like `new version resume (MM/YYYY)` — match that style when bumping `resume.pdf`.
- The deployed site is `https://jalil-M.github.io/`; pushes to `master` go live directly.
