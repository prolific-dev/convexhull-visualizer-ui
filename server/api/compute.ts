import type { ConvexHullRequest, ConvexHullResponse } from '../../shared/dto/dto'

/**
 * Handler for `/api/compute`.
 *
 * This endpoint expects a request body matching `ConvexHullRequest`:
 * - `input: string[]` — array of point strings (format expected by backend, e.g. "x,y").
 *
 * The backend may return either a `ConvexHullResponse` or a richer `ConvexHullFullResponse`.
 * We parse and validate the returned object and always return a `ConvexHullResponse` to the client.
 *
 * DTO fields (from `shared/dto/dto.d.ts`):
 * - `ConvexHullRequest`:
 *   - `input: string[]` — input points encoded as strings.
 * - `ConvexHullResponse`:
 *   - `hull: string[]` — array of points (as strings) forming the convex hull.
 * - `ConvexHullFullResponse` (additional fields provided by backend when available):
 *   - `input: string[]` — original input points.
 *   - `base: string[]` — base points used by the algorithm (implementation-specific meaning).
 *   - `colinear: string[]` — points that were colinear and treated specially.
 *   - `hull: string[]` — points forming the convex hull.
 *   - `algorimthm: string` — name of the algorithm used (note: spelling matches backend `algorimthm`).
 *   - `computationTimeMs: number` — computation time in milliseconds.
 *   - `timestamp: string` — ISO timestamp when computation completed.
 */
export default defineEventHandler(async (event): Promise<ConvexHullResponse> => {
  const config = useRuntimeConfig()

  const body = await readBody<ConvexHullRequest>(event)
  if (!body || !Array.isArray(body.input)) {
    throw createError({ statusCode: 400, statusMessage: 'Request body must be { input: string[] }' })
  }

  const res = await fetch(`${config.apiUrl}/api/v1/compute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText || 'Backend error')
    throw createError({ statusCode: res.status || 502, statusMessage: text })
  }

  const data = await res.json()

  const hull = (data as Partial<ConvexHullResponse>)?.hull
  if (!hull || !Array.isArray(hull)) {
    throw createError({ statusCode: 502, statusMessage: 'Invalid response from backend: missing hull array' })
  }

  const rsp: ConvexHullResponse = { hull }

  return rsp
})
