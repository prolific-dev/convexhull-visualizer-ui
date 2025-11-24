<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Point2D, Point3D } from '~/types/point'

const store = useStore()

const data2D = ref<Point2D[]>([
  { x: 0, y: 0, convexType: 'Hull' },
  { x: 0, y: 2, convexType: 'Hull' },
  { x: 2, y: 0, convexType: 'Hull' },
  { x: 2, y: 2, convexType: 'Hull' },
  { x: 1, y: 1, convexType: 'Inner' },
  { x: 0, y: 1, convexType: 'Colinear' }
])

const data3D = ref<Point3D[]>([
  { x: 0, y: 0, z: 0, convexType: 'Hull' },
  { x: 0, y: 0, z: 2, convexType: 'Hull' },
  { x: 0, y: 2, z: 0, convexType: 'Hull' },
  { x: 0, y: 2, z: 2, convexType: 'Hull' },
  { x: 2, y: 0, z: 0, convexType: 'Hull' },
  { x: 2, y: 0, z: 2, convexType: 'Hull' },
  { x: 2, y: 2, z: 0, convexType: 'Hull' },
  { x: 2, y: 2, z: 2, convexType: 'Hull' },
  { x: 1, y: 1, z: 1, convexType: 'Inner' },
])

const UBadge = resolveComponent('UBadge')

const columns2D: TableColumn<Point2D>[] = [
  {
    accessorKey: 'x',
    header: 'X-Value',
    cell: ({ row }) => row.getValue('xval')
  },
  {
    accessorKey: 'y',
    header: 'Y-Value',
    cell: ({ row }) => row.getValue('yval')
  },
  {
    accessorKey: 'convexType',
    header: 'Convex Type',
    cell: ({ row }) => {
      const color = {
        hull: 'success' as const,
        inner: 'error' as const,
        colinear: 'neutral' as const
      }[row.getValue('convexType') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('convexType')
      )
    }
  }
]

const columns3D: TableColumn<Point3D>[] = [
  {
    accessorKey: 'x',
    header: 'X-Value',
    cell: ({ row }) => row.getValue('x')
  },
  {
    accessorKey: 'y',
    header: 'Y-Value',
    cell: ({ row }) => row.getValue('y')
  },
  {
    accessorKey: 'z',
    header: 'Z-Value',
    cell: ({ row }) => row.getValue('z')
  },
  {
    accessorKey: 'convexType',
    header: 'Convex Type',
    cell: ({ row }) => {
      const color = {
        hull: 'success' as const,
        inner: 'error' as const,
      }[row.getValue('convexType') as string]

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('convexType')
      )
    }
  }
]

const columns = computed(() => (store.graphDimension.is3D ? columns3D : columns2D)) as ComputedRef<
  TableColumn<Point2D | Point3D>[]
>
</script>

<template>
  <UTable
    :data="store.graphDimension.is3D ? data3D : data2D"
    :columns="columns"
    class="shrink-0"
    :ui="{
      base: 'table-fixed border-sperate border-spacing-0',
      thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
      tbody: '[&>tr]:last:[&>td]:border-b-0',
      th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
      td: 'border-b border-default'
    }"
  />
</template>
