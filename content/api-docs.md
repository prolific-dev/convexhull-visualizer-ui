---
title: ConvexHull Visualizer API — Quick Start
description: Short, copy-paste instructions to call the backend API that computes convex hulls.
---

# ConvexHull Visualizer API — Quick Start

Short, copy-paste instructions to call the backend API that computes convex hulls.

## Base URL
`http://localhost:8080` (default when running the API locally)

The backend also runs (officially) at `http://prolific-dev.com:8080`. You can configure the UI to forward requests to that host by setting the runtime `apiUrl` to `http://prolific-dev.com:8080`.

## Where this repo talks to the API

There are two layers you may interact with when running the UI locally:

- The UI's built-in server endpoints (Nuxt server routes) that the frontend calls: `POST /api/compute2d` and `POST /api/compute3d`. These proxy requests to the actual backend configured via runtime config.
- The backend API used by the UI: `POST /api/v1/convexhull/2d/compute/full` and `POST /api/v1/convexhull/3d/compute/full` (the UI proxies to these). When running the backend locally the default base URL is `http://localhost:8080`.

## Important Endpoints

- Local (UI) proxy endpoints (recommended when using the full app):
	- `POST /api/compute2d` — accepts the same body as the backend 2D endpoint and returns the full response.
	- `POST /api/compute3d` — accepts the same body as the backend 3D endpoint and returns the full response.

- Backend API endpoints (the UI forwards to these):
	- `POST /api/v1/convexhull/2d/compute/full` — returns detailed 2D convex hull info.
	- `POST /api/v1/convexhull/3d/compute/full` — returns detailed 3D convex hull info.

## Request format

All endpoints accept a JSON body matching the `ConvexHullRequest` DTO used by the app:

```json
{ "input": [ "x,y", "x,y", ... ] }
```

- For 2D endpoints each input point should be encoded as a string like `"12.3,45.6"` (x,y).
- For 3D endpoints each input point should be encoded as a string like `"12.3,45.6,7.8"` (x,y,z).

The UI's server handlers validate that the request has an `input` array of strings and will return a `400` if it's missing.

## Response format

The UI expects (and validates) a rich response matching `ConvexHullFullResponse`:

```json
{
	"input": [ "..." ],
	"base": [ "..." ],
	"colinear": [ "..." ],
	"hull": [ "..." ],
	"algorithm": "<algorithm-name>",
	"computationTimeMs": 123,
	"timestamp": "2025-11-27T12:34:56.789Z"
}
```

- `input`: original input points (strings).
- `base`: base points used internally by the algorithm (implementation-specific).
- `colinear`: points detected as colinear.
- `hull`: points that form the convex hull (ordered as returned by backend).
- `algorithm`: name of the algorithm used (string).
- `computationTimeMs`: computation time in milliseconds (number).
- `timestamp`: ISO timestamp when the computation completed.

If the backend returns a malformed response the UI will return a `502` and surface an error message.

## Examples

1) Call the UI proxy (2D) with `curl`:

```bash
curl -X POST http://localhost:3000/api/compute2d \
	-H 'Content-Type: application/json' \
	-d '{ "input": ["0,0","1,0","1,1","0,1","0.5,0.5"] }'
```

2) Call the backend API directly (if backend runs on `localhost:8080`):

```bash
curl -X POST http://localhost:8080/api/v1/convexhull/2d/compute/full \
	-H 'Content-Type: application/json' \
	-d '{ "input": ["0,0","1,0","1,1","0,1","0.5,0.5"] }'
```

Or call the official hosted backend at `http://prolific-dev.com:8080`:

```bash
curl -X POST http://prolific-dev.com:8080/api/v1/convexhull/2d/compute/full \
	-H 'Content-Type: application/json' \
	-d '{ "input": ["0,0","1,0","1,1","0,1","0.5,0.5"] }'
```

3) Example using `fetch` in Node / browser:

```js
const res = await fetch('http://localhost:3000/api/compute2d', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ input: ['0,0','1,0','1,1','0,1','0.5,0.5'] }),
})
const data = await res.json()
console.log(data)
```

## Notes / implementation details (from this repo)

- The UI exposes server routes at `server/api/compute2d.ts` and `server/api/compute3d.ts` which read the request body, validate that `input` is an array, then proxy to the configured backend URL (`useRuntimeConfig().apiUrl`) at the paths shown above.
- The DTO definitions are in `shared/dto/dto.d.ts` and are the authoritative types used by the UI. The `ConvexHullFullResponse` shape is documented there and validated by the proxy handlers.
- If the backend is unreachable the UI proxy will return an error (502) and include the backend status/text when available.

## Running locally

- Start the UI (dev):

```bash
pnpm install
pnpm dev
```

- If you run the backend separately, set the runtime config `apiUrl` (for example via env or Nuxt runtime config) to point to the backend base URL (e.g. `http://localhost:8080`). When running the full stack locally the default backend base URL expected by these docs is `http://localhost:8080`.

- The backend may also be available at `http://prolific-dev.com:8080`; set your runtime config `apiUrl` to that URL if you want the UI to proxy to the hosted backend instead of a local one.

## Troubleshooting

- `400` — request body missing or invalid (must be `{ input: string[] }`).
- `502` — backend returned an error or an invalid/malformed response.

## Next steps, support and contribution

The repository may include a short example page under `content/` or a runnable script under `scripts/` to exercise the endpoints automatically. For a more complete setup, consider the following:

- Example scripts: add a small script (for example `scripts/compute-example.js`) that posts sample input to `/api/compute2d` and logs the validated response.
- Integration guidance: validate that `input` is an array of coordinate strings before sending requests; handle `400` and `502` responses gracefully; surface backend errors to users and consider retries for transient network issues.
- Troubleshooting: enable application logs and verify the runtime `apiUrl` when the UI cannot reach the backend.

Support and contribution
- Report bugs or request features via this repository's issue tracker.
- Contributions are welcome — open a pull request that includes tests and a concise description of the changes.
- Refer to `LICENSE` and `CHANGELOG.md` in the repository for licensing terms and release notes.

An example page or script and a brief README snippet demonstrating how to run it can be produced on request; indicate whether the example should be placed under `content/` or `scripts/`.
