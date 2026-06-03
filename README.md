# Portfolio Website

A static single-page portfolio site built with vanilla HTML, CSS, and JavaScript. No build step, no framework — open `index.html` and it runs.

## Structure

```
static-dog/
├── index.html          # Single page, all markup
├── styles.css          # All styles — layers, responsive breakpoints
├── main.js             # Clock, weather animation, bio tracking
└── images/
    ├── light-mode-office-og.png   # Landscape desktop background (5504×3072)
    ├── portrait_background.png    # Portrait mobile background (3072×5504)
    ├── window-mask.png            # Luminance mask — constrains sky/sun to window
    ├── light-mode-office.png      # Alternate landscape variant
    ├── light-mode-office-add.png  # Alternate landscape variant
    └── dark-mode-office.png       # Dark mode background (unused, ready to wire up)
```

## Layers

The scene is composed of three stacked layers:

| Layer | Element | Purpose |
|-------|---------|---------|
| 1 | `.bg` | Office illustration background (`background-size: cover`) |
| 2 | `.weather-layer` | Sky gradient + animated sun, masked to the window opening via `window-mask.png` |
| 3 | `.overlay` | Live clock + bio text (name, tagline, social links) |

## Responsive behavior

- **Desktop (> 600px):** Landscape illustration. The bio block is pinned to the white panel in the lower-left bookshelf via JavaScript cover-tracking math (see `positionBio()` in `main.js`).
- **Mobile (≤ 600px):** Portrait illustration crossfades in. Weather layer fades out. Bio anchors to the bottom of the screen. Clock is hidden.

The background swap is a CSS `opacity` transition on a `::after` pseudo-element — no JavaScript needed for the crossfade.

## Running locally

```bash
python3 -m http.server 8765
# then open http://localhost:8765
```

Any static file server works — the site has no server-side dependencies.

## Customization

| What | Where |
|------|-------|
| Weather mode | `WEATHER` constant in `main.js` — `'sunny'`, `'rain'`, `'snow'` |
| Bio panel position | `PANEL` constant in `main.js` — normalized 0–1 coords within the landscape image |
| Mobile breakpoint | `600px` in `styles.css` and `main.js` |
| Social links | `<a href="...">` tags in `index.html` |
| Font scaling | `font-size: clamp(...)` on `.bio` in `styles.css` |
