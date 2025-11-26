---
seo:
  title: Convex Hull Visualizer
  description: Interactive 2D/3D convex hull visualization with tunable algorithms, sample data, and export tools.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950"}
#title
Convex Hulls, Crystal Clear.

#description
Design-grade visuals for geometry demos, courseware, and validations. Switch between 2D and 3D, tune algorithms live, and export results in seconds.

#links
  :::u-button
  ---
  to: /chart
  size: xl
  trailing-icon: i-lucide-arrow-up-right
  ---
  Launch visualizer
  :::

  :::u-button
  ---
  icon: i-lucide-book-open
  color: neutral
  variant: outline
  size: xl
  to: /api-docs
  ---
  View API docs
  :::
::

::u-page-section
#title
Built for visual impact and clarity

#description
From classroom walkthroughs to engineering reviews, every control is designed to surface the hull quickly and make the story obvious.

#default
  :::u-page-grid
  #items
  - title: Cinematic hero view
    description: Glide through scenes with smooth orbit, pan, and zoom in both 2D and 3D.
  - title: Algorithm agility
    description: Swap Quickhull or Graham Scan, adjust iterations, and see each intermediate step with the live stepper.
  - title: Data-ready
    description: Start with curated clusters from /api/data2d and /api/data3d or drop in your own points and weights.
  - title: Export on cue
    description: Capture the canvas as JSON or a screenshot and keep the exact config for reproducible demos.
  :::
::

::u-page-section
#title
How it flows

#default
  1. **Load points** – Open `/chart`, pick a sample dataset, paste your own, or hit the API for programmatic runs.
  2. **Tune the run** – In `/settings`, choose the algorithm, limit iterations, toggle debug overlays, and style the hull.
  3. **Inspect step-by-step** – Use the stepper to watch each facet form, orbit the scene, and verify edges before exporting.
  4. **Share the outcome** – Save JSON, snapshots, or deep links with the same parameters to keep collaborators aligned.
::

::u-page-section
#title
Where to click next

#default
  :::u-accordion
  - label: /chart
    content: Main canvas with navigation, stepper, hull controls, and sampling presets.
  - label: /settings
    content: Full control center for algorithm choice, point styling, overlays, and performance tuning.
  - label: /api-docs
    content: Reference for `compute`, `compute-full`, `data2d`, and `data3d`, including payload shapes.
  - label: /about
    content: Implementation notes, libraries, and licensing context.
  :::
::

::u-page-section
#title
API quick reference

#default
  ```txt
  GET  /api/data2d        # Sample points in 2D
  GET  /api/data3d        # Sample points in 3D
  POST /api/compute       # Computes hull with metadata
  POST /api/compute-full  # Includes intermediate steps
  ```