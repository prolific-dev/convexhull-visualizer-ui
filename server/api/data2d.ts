import type { ConvexHullFullResponse } from '~~/shared/dto'

const response: ConvexHullFullResponse = {
  input: ['0,0', '0,2', '2,0', '2,2', '1,1'],
  base: ['1,1'],
  colinear: [],
  hull: ['0,0', '0,2', '2,2', '2,0'],
  algorimthm: 'Graham Scan',
  computationTimeMs: 1,
  timestamp: '2024-06-10T12:00:00Z'
}

export default defineEventHandler(async () => {
  return response
})
