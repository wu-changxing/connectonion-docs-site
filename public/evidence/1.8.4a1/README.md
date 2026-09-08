# 1.8.4a1 documentation preview evidence

Captured 8 September 2026 from a local production build of this documentation
change at `http://127.0.0.1:3185/releases`. Stable remained `1.8.3`; the prepared
preview was `1.8.4a1`. The preview channel is published only after the package
becomes publicly installable.

- `releases-desktop.png`: 1440-pixel viewport; stable and preview entries visible.
- `releases-mobile.png`: 375-pixel viewport; no document-level horizontal overflow.
- Both viewports passed assertions for the stable and preview version text.
- All eight linked candidate Markdown guides returned HTTP 200 and named
  `1.8.4a1`.
- TypeScript and the Next.js production build passed before capture.

The screenshots contain public release descriptions and synthetic examples only.
