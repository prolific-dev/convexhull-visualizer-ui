# Convex Hull Visualizer UI

Interactive Nuxt 4 / Vue 3 UI for generating and visualizing convex hulls in 2D and 3D. Includes chart settings, responsive layouts, and a small server API for computing hulls and serving sample data.

## Features

- **2D and 3D Visualization**: Interactive visualizations for convex hulls.
- **Customizable Settings**: Modify chart and algorithm options via the settings pages.
- **Responsive Design**: Optimized for various screen sizes.
- **Server API**: Lightweight TypeScript endpoints for computation and sample data.
- **Nuxt 4 / Vue 3**: Built with modern web technologies.

## Quick Start

### Development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

### Production

Build and preview the production version:

```bash
pnpm build
pnpm preview
```

## Project Structure

- `app/` — Nuxt app routes and pages.
- `components/graph/` — Visualization components (`GraphVis2D.vue`, `GraphVis3D.vue`, etc.).
- `server/api/` — Server endpoints for computation and sample data (`compute2d.ts`, `compute3d.ts`, etc.).
- `public/` and `assets/` — Static files and styles.
- `stores/` — Pinia stores for state management.
- `types/` — TypeScript type definitions.
- `utils/` — Utility functions.

## Usage Notes

- **Settings Pages**: Use the settings pages under `app/pages/settings` to tweak chart and algorithm options.
- **Server Endpoints**: The server endpoints are lightweight TypeScript functions. Inspect `server/api` to see how data is generated and computed.
- **Visualization Components**: The `components/graph/` directory contains reusable components for 2D and 3D graph visualizations.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and concise messages.
4. Open a pull request and describe your changes.

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).
See the `LICENSE` file for full terms and details.

---
