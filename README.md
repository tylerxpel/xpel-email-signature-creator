# XPEL Signature Generator

A guided, self-contained email signature builder for XPEL employees. Generates Outlook-compatible HTML signatures with embedded assets — no external dependencies at runtime.

## Features

- **3-step wizard** — fill in details, preview, then copy and install
- **Light & Dark mode** — switches the signature card background and text colors
- **Outlook-safe HTML** — table-based layout with base64-embedded images (logos, dividers, diamond watermark)
- **3-tier clipboard fallback** — modern Clipboard API → `execCommand` → manual-copy tab
- **No build step** — open `index.html` directly or serve from any static host

## Project structure

```
├── index.html   — page markup and wizard UI
├── style.css    — all visual styles (design tokens, layout, components)
├── assets.js    — base64-embedded image assets (XPEL logos, dividers, diamonds)
├── app.js       — wizard logic, signature generator, clipboard copy, form wiring
└── README.md
```

| Property | Value |
|---|---|
| Total width | 600 px |
| Card backgrounds | `#FFFFFD` (light) · `#141213` (dark) |
| Column layout | 30 · 145 · 30 · 1 · 30 · 239 · 125 = 600 px |
| Fonts (email) | Helvetica, Arial, sans-serif |
| Compatibility | Outlook desktop (Word renderer), Outlook Web, Apple Mail |

## Notes

- Job titles are automatically uppercased in the rendered signature.
- The phone field is optional; the line is omitted entirely when left blank.
- Image assets are embedded as base64 data URIs so they survive copy-paste into Outlook without needing a hosted image server.

## Brand

XPEL brand yellow: Pantone 1235 C / `#FDB521`  
Signature accent: `#FFB81C`
