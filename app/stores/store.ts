import { defineStore } from 'pinia'

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

interface GraphDataState {
  is3D: boolean
}

interface GraphDataState2D {
  input: Array<{ x: number, y: number }>
  hull: Array<{ x: number, y: number }>
  base: Array<{ x: number, y: number }>
  colinear: Array<{ x: number, y: number }>
  algorithm: string
  computationTimeMs: number
  timestamp: string
}

interface GraphDataState3D {
  input: Array<{ x: number, y: number, z: number }>
  hull: Array<{ x: number, y: number, z: number }>
  base: Array<{ x: number, y: number, z: number }>
  colinear: Array<{ x: number, y: number, z: number }>
  algorithm: string
  computationTimeMs: number
  timestamp: string
}

export const useStore = defineStore('myStore', {
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
    graphState: {
      is3D: true
    },
    graphData2D: {
      input: [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
        { x: 2, y: 2 }
      ],
      hull: [
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
        { x: 0, y: 2 }
      ],
      base: [
        { x: 1, y: 1 },
      ],
      colinear: [],
      algorithm: 'Graham Scan',
      computationTimeMs: 1,
      timestamp: '2024-01-01T12:00:00Z'
    } as GraphDataState2D,
    graphData3D: {
      input: [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 0, y: 2, z: 0 },
        { x: 0, y: 0, z: 2 },
        { x: 0, y: 2, z: 2 },
        { x: 2, y: 0, z: 2 },
        { x: 2, y: 2, z: 0 },
        { x: 2, y: 2, z: 2 },
        { x: 1, y: 1, z: 1 }
      ],
      hull: [
        { x: 0, y: 0, z: 0 },
        { x: 2, y: 0, z: 0 },
        { x: 0, y: 2, z: 0 },
        { x: 0, y: 0, z: 2 },
        { x: 0, y: 2, z: 2 },
        { x: 2, y: 0, z: 2 },
        { x: 2, y: 2, z: 0 },
        { x: 2, y: 2, z: 2 }
      ],
      base: [
        { x: 1, y: 1, z: 1 }
      ],
      colinear: [],
      algorithm: 'Quickhull',
      computationTimeMs: 10,
      timestamp: '2024-01-01T12:00:00Z'
    } as GraphDataState3D
  }),
})
