export interface ConvexHullRequest {
  input: string[]
}

export interface ConvexHullResponse {
  hull: string[]
}

export interface ConvexHullFullResponse {
  input: string[]
  base: string[]
  colinear: string[]
  hull: string[]
  algorimthm: string
  computationTimeMs: number
  timestamp: string
}
