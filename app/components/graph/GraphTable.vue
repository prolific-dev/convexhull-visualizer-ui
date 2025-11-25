<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Point2D, Point3D } from '~/types/point'

const store = useStore()

const data2D = computed(() => {
  const hull = store.graphData2D.hull.map((p) => ({ ...p, convexType: 'Hull' }))
  const inner = store.graphData2D.inner.map((p) => ({ ...p, convexType: 'Inner' }))
  const colinear = store.graphData2D.colinear?.map((p) => ({ ...p, convexType: 'Colinear' })) ?? []
  return [...hull, ...inner, ...colinear]
})
const data3D = computed(() => {
  const hull = store.graphData3D.hull.map((p) => ({ ...p, convexType: 'Hull' }))
  const inner = store.graphData3D.inner.map((p) => ({ ...p, convexType: 'Inner' }))
  return [...hull, ...inner]
})

const UBadge = resolveComponent('UBadge')

const columns2D: TableColumn<Point2D>[] = [
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
