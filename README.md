# Convex Hull Visualizer UI

Interactive Nuxt 4 / Vue 3 UI for generating and visualizing convex hulls in 2D and 3D. Includes chart settings, responsive layouts, and a small server API for computing hulls and serving sample data.

## Quick start

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

Build and preview production:

```bash
pnpm build
pnpm preview
```

## Structure

- `app/` — Nuxt app routes and pages
- `components/graph/` — visualization components (`GraphVis2D.vue`, `GraphVis3D.vue`, etc.)
- `server/api/` — server endpoints used for compute and sample data (`compute.ts`, `compute-full.ts`, `data2d.ts`, `data3d.ts`)
- `public/` and `assets/` — static files and styles

## Notes

- Use the settings pages under `app/pages/settings` to tweak chart and algorithm options.
- The server endpoints are lightweight TypeScript functions — inspect `server/api` to see how data is generated and computed.

## License
This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).
See the `LICENSE` file for full terms and details.
