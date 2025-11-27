import { defineStore } from 'pinia'
import { Point2D, Point3D } from '~/types/point'
import type { ConvexHullFullResponse } from '~~/shared/dto/dto'

interface ProfileInfo {
  name: string
  email: string
  username: string
  avatarUrl: string
  bio: string
}

interface NotificationSettings {
  emailNotifications: boolean
  desktopNotifications: boolean
  weeklyDigest: boolean
  productUpdates: boolean
  importantUpdates: boolean
}

interface GraphDimension {
  is3D: boolean
}

interface GraphData {
  input: Array<Point2D | Point3D>
  hull: Array<Point2D | Point3D>
  inner: Array<Point2D | Point3D>
  colinear?: Array<Point2D | Point3D>
  algorithm: string
  computationTimeMs: number
  timestamp: string
}

export const useStore = defineStore('convexhull-visualizer-store', {
  state: () => ({
    profileInfo: {
      name: 'James Dean',
      email: 'james.dean@example.com',
      username: 'jamesdean27',
      avatarUrl: '',
      bio: ''
    } as ProfileInfo,
    notificationSettings: {
      emailNotifications: false,
      desktopNotifications: false,
      weeklyDigest: false,
      productUpdates: false,
      importantUpdates: false
    } as NotificationSettings,
    graphDimension: {
      is3D: true
    } as GraphDimension,
    graphData2D: {
      input: ([
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
        { x: 2, y: 2 },
      ]),
      hull: [
        { x: 0, y: 0, convexType: 'Hull' },
        { x: 2, y: 0, convexType: 'Hull' },
        { x: 2, y: 2, convexType: 'Hull' },
        { x: 0, y: 2, convexType: 'Hull' },
      ],
      inner: [
        { x: 1, y: 1, convexType: 'Inner' },
      ],
      colinear: [],
      algorithm: 'Graham Scan',
      computationTimeMs: 1,
      timestamp: '2024-01-01T12:00:00Z'
    } as GraphData,
    graphData3D: {
      input: ([
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 0, y: 2, z: 0 },
        { x: 0, y: 0, z: 2 },
        { x: 0, y: 2, z: 2 },
        { x: 2, y: 0, z: 2 },
        { x: 2, y: 2, z: 0 },
        { x: 2, y: 2, z: 2 },
        { x: 1, y: 1, z: 1 }
      ]),
      hull: [
        { x: 0, y: 0, z: 0, convexType: 'Hull' },
        { x: 2, y: 0, z: 0, convexType: 'Hull' },
        { x: 0, y: 2, z: 0, convexType: 'Hull' },
        { x: 0, y: 0, z: 2, convexType: 'Hull' },
        { x: 0, y: 2, z: 2, convexType: 'Hull' },
        { x: 2, y: 0, z: 2, convexType: 'Hull' },
        { x: 2, y: 2, z: 0, convexType: 'Hull' },
        { x: 2, y: 2, z: 2, convexType: 'Hull' }
      ],
      inner: [
        { x: 1, y: 1, z: 1, convexType: 'Inner' }
      ],
      colinear: [],
      algorithm: 'Quickhull',
      computationTimeMs: 10,
      timestamp: '2024-01-01T12:00:00Z'
    } as GraphData
  }),
  actions: {
    setIs3D(value: boolean) {
      this.graphDimension.is3D = value
    },

    toggleDimension() {
      this.graphDimension.is3D = !this.graphDimension.is3D
    },

    setInputPoints2D(points: Set<Point2D>) {
      this.graphData2D.input = Array.from(points).map((p) => ({
        x: p.x,
        y: p.y,
        convexType: p.convexType
      }))
    },

    setInputPoints3D(points: Set<Point3D>) {
      this.graphData3D.input = Array.from(points).map((p) => ({
        x: p.x,
        y: p.y,
        z: p.z,
        convexType: p.convexType
      }))
    },

    setInputPoints(points: Set<Point2D | Point3D>) {
      if (this.graphDimension.is3D) {
        this.setInputPoints3D(points as Set<Point3D>)
      } else {
        this.setInputPoints2D(points as Set<Point2D>)
      }
    },

    setHullPoints2D(points: Array<Point2D>) {
      this.graphData2D.hull = points
    },

    setHullPoints3D(points: Array<Point3D>) {
      this.graphData3D.hull = points
    },

    setHullPoints(points: Array<Point2D | Point3D>) {
      if (this.graphDimension.is3D) {
        this.setHullPoints3D(points as Array<Point3D>)
      } else {
        this.setHullPoints2D(points as Array<Point2D>)
      }
    },

    setInnerPoints2D(points: Array<Point2D>) {
      this.graphData2D.inner = points
    },

    setInnerPoints3D(points: Array<Point3D>) {
      this.graphData3D.inner = points
    },

    setBasePoints(points: Array<Point2D | Point3D>) {
      if (this.graphDimension.is3D) {
        this.setInnerPoints3D(points as Array<Point3D>)
      } else {
        this.setInnerPoints2D(points as Array<Point2D>)
      }
    },

    setColinearPoints2D(points: Array<Point2D>) {
      this.graphData2D.colinear = points
    },

    setColinearPoints3D(points: Array<Point3D>) {
      this.graphData3D.colinear = points
    },

    setColinearPoints(points: Array<Point2D | Point3D>) {
      if (this.graphDimension.is3D) {
        this.setColinearPoints3D(points as Array<Point3D>)
      } else {
        this.setColinearPoints2D(points as Array<Point2D>)
      }
    },

    setAlgorithm2D(name: string) {
      this.graphData2D.algorithm = name
    },

    setAlgorithm3D(name: string) {
      this.graphData3D.algorithm = name
    },

    setAlgorithm(name: string) {
      if (this.graphDimension.is3D) {
        this.setAlgorithm3D(name)
      } else {
        this.setAlgorithm2D(name)
      }
    },

    setComputationTimeMs2D(timeMs: number) {
      this.graphData2D.computationTimeMs = timeMs
    },

    setComputationTimeMs3D(timeMs: number) {
      this.graphData3D.computationTimeMs = timeMs
    },

    setComputationTimeMs(timeMs: number) {
      if (this.graphDimension.is3D) {
        this.setComputationTimeMs3D(timeMs)
      } else {
        this.setComputationTimeMs2D(timeMs)
      }
    },

    setTimestamp2D(timestamp: string) {
      this.graphData2D.timestamp = timestamp
    },

    setTimestamp3D(timestamp: string) {
      this.graphData3D.timestamp = timestamp
    },

    setTimestamp(timestamp: string) {
      if (this.graphDimension.is3D) {
        this.setTimestamp3D(timestamp)
      } else {
        this.setTimestamp2D(timestamp)
      }
    },

    async _computeGraphData2D(points: Set<Point2D>) {
      try {
        const { data, error } = await useFetch('/api/compute2d', {
          method: 'POST',
          body: {
            input: Array.from(points).map((p) => `${p.x},${p.y}`),
          }
        })

        if (error?.value) {
          console.error('Failed to compute 2D convex hull:', error.value)
          return
        }

        const resp = data?.value as Partial<ConvexHullFullResponse> | undefined
        if (!resp) {
          console.error('Empty response from compute-full')
          return
        }

        const input = (resp?.input ?? []) as string[]
        const base = (resp?.base ?? []) as string[]
        const hull = (resp?.hull ?? []) as string[]
        const colinear = (resp?.colinear ?? []) as string[]

        this.setInputPoints2D(new Set<Point2D>(input.map((s) => {
          const parts = s.split(',').map((n) => Number(n))
          return new Point2D(parts[0] ?? 0, parts[1] ?? 0)
        })))

        this.setInnerPoints2D(base.map((s) => {
          const parts = s.split(',').map((n) => Number(n))
          return { x: parts[0] ?? 0, y: parts[1] ?? 0, convexType: 'Inner' }
        }))

        this.setHullPoints2D(hull.map((s) => {
          const parts = s.split(',').map((n) => Number(n))
          return { x: parts[0] ?? 0, y: parts[1] ?? 0, convexType: 'Hull' }
        }))

        this.setColinearPoints2D(colinear.map((s) => {
          const parts = s.split(',').map((n) => Number(n))
          return { x: parts[0] ?? 0, y: parts[1] ?? 0, convexType: 'Colinear' }
        }))

        this.setAlgorithm2D(String(resp?.algorithm ?? ''))
        this.setComputationTimeMs2D(Number(resp?.computationTimeMs ?? 0))
        this.setTimestamp2D(String(resp?.timestamp ?? ''))
      } catch (error) {
        console.error('Failed to compute 2D convex hull', error)
      }
    },

    async _computeGraphData3D(points: Set<Point3D>) {
      try {
        const { data, error } = await useFetch('/api/compute3d', {
          method: 'POST',
          body: {
            input: Array.from(points).map((p) => `${p.x},${p.y},${p.z}`),
          }
        })

        if (error?.value) {
          console.error('Failed to compute 2D convex hull:', error.value)
          return
        }

        const resp = data?.value as Partial<ConvexHullFullResponse> | undefined
        if (!resp) {
          console.error('Empty response from compute-full')
          return
        }

        const input = (resp?.input ?? []) as string[]
        const base = (resp?.base ?? []) as string[]
        const hull = (resp?.hull ?? []) as string[]
        const colinear = (resp?.colinear ?? []) as string[]

        this.setInputPoints3D(new Set<Point3D>(input.map((s) => {
          const parts = s.split(',').map((n) => Number(n))
          return new Point3D(parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0)
        })))

        this.setInnerPoints3D(base.map((s) => {
          const parts = s.split(',').map((n) => Number(n))
          return { x: parts[0] ?? 0, y: parts[1] ?? 0, z: parts[2] ?? 0, convexType: 'Inner' }
        }))

        this.setHullPoints3D(hull.map((s) => {
          const parts = s.split(',').map((n) => Number(n))
          return { x: parts[0] ?? 0, y: parts[1] ?? 0, z: parts[2] ?? 0, convexType: 'Hull' }
        }))

        this.setColinearPoints3D(colinear.map((s) => {
          const parts = s.split(',').map((n) => Number(n))
          return { x: parts[0] ?? 0, y: parts[1] ?? 0, z: parts[2] ?? 0, convexType: undefined }
        }))

        this.setAlgorithm3D(String(resp?.algorithm ?? ''))
        this.setComputationTimeMs3D(Number(resp?.computationTimeMs ?? 0))
        this.setTimestamp3D(String(resp?.timestamp ?? ''))
      } catch (error) {
        console.error('Failed to compute 3D convex hull', error)
      }
    },

    async addPoint2D(point: Point2D) {
      const newSet = new Set<Point2D>(this.graphData2D.input)
      newSet.add(point)
      await this._computeGraphData2D(newSet)
    },

    async addPoint3D(point: Point3D) {
      const newSet = new Set<Point3D>(this.graphData3D.input)
      newSet.add(point)
      await this._computeGraphData3D(newSet)
    },

    async addPoint(point: Point2D | Point3D) {
      if (this.graphDimension.is3D && point instanceof Point3D) {
        this.addPoint3D(point)
      } else if (!this.graphDimension.is3D && point instanceof Point2D) {
        this.addPoint2D(point)
      }
    },

    async removePoint2D(point: Point2D) {
      const newSet = new Set<Point2D>(this.graphData2D.input)
      newSet.forEach((p) => {
        if (p.x === point.x && p.y === point.y) {
          newSet.delete(p)
          return
        }
      })
      await this._computeGraphData2D(newSet)
    },

    async removePoint3D(point: Point3D) {
      const newSet = new Set<Point3D>(this.graphData3D.input)
      newSet.forEach((p) => {
        if (p.x === point.x && p.y === point.y && p.z === point.z) {
          newSet.delete(p)
          return
        }
      })
      await this._computeGraphData3D(newSet)
    },

    removePoint(point: Point2D | Point3D) {
      if (this.graphDimension.is3D && point instanceof Point3D) {
        this.removePoint3D(point)
      } else if (!this.graphDimension.is3D && point instanceof Point2D) {
        this.removePoint2D(point)
      }
    },

    clear2D() {
      this.graphData2D.input = []
      this.graphData2D.hull = []
      this.graphData2D.inner = []
      this.graphData2D.colinear = []
      this.graphData2D.algorithm = ''
      this.graphData2D.computationTimeMs = 0
      this.graphData2D.timestamp = ''
    },

    clear3D() {
      this.graphData3D.input = []
      this.graphData3D.hull = []
      this.graphData3D.inner = []
      this.graphData3D.colinear = []
      this.graphData3D.algorithm = ''
      this.graphData3D.computationTimeMs = 0
      this.graphData3D.timestamp = ''
    },

    clearAll() {
      if (this.graphDimension.is3D) {
        this.clear3D()
      } else {
        this.clear2D()
      }
    }
  },
  persist: import.meta.client ? { key: 'convexhull-visualizer-ui-store', storage: localStorage } : false,
})
