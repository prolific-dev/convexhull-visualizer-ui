<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { useStore } from '../../stores/store'
import { h, resolveComponent } from 'vue'

type MyTableData = {
  xval: number
  yval: number
  zval?: number
  convexType: 'hull' | 'inner' | 'colinear'
}

const store = useStore()

const data2D = ref<MyTableData[]>([
  { xval: 0, yval: 0, convexType: 'hull' },
  { xval: 0, yval: 2, convexType: 'hull' },
  { xval: 2, yval: 0, convexType: 'hull' },
  { xval: 2, yval: 2, convexType: 'hull' },
  { xval: 1, yval: 1, convexType: 'inner' },
  { xval: 0, yval: 1, convexType: 'colinear' }
])

const data3D = ref<MyTableData[]>([
  { xval: 0, yval: 0, zval: 0, convexType: 'hull' },
  { xval: 0, yval: 0, zval: 2, convexType: 'hull' },
  { xval: 0, yval: 2, zval: 0, convexType: 'hull' },
  { xval: 0, yval: 2, zval: 2, convexType: 'hull' },
  { xval: 2, yval: 0, zval: 0, convexType: 'hull' },
  { xval: 2, yval: 0, zval: 2, convexType: 'hull' },
  { xval: 2, yval: 2, zval: 0, convexType: 'hull' },
  { xval: 2, yval: 2, zval: 2, convexType: 'hull' },
  { xval: 1, yval: 1, zval: 1, convexType: 'inner' },
])

const UBadge = resolveComponent('UBadge')

const columns2D: TableColumn<MyTableData>[] = [
  {
    accessorKey: 'xval',
    header: 'X-Value',
    cell: ({ row }) => row.getValue('xval')
  },
  {
    accessorKey: 'yval',
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

const columns3D: TableColumn<MyTableData>[] = [
  {
    accessorKey: 'xval',
    header: 'X-Value',
    cell: ({ row }) => row.getValue('xval')
  },
  {
    accessorKey: 'yval',
    header: 'Y-Value',
    cell: ({ row }) => row.getValue('yval')
  },
  {
    accessorKey: 'zval',
    header: 'Z-Value',
    cell: ({ row }) => row.getValue('zval')
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
</script>

<template>
  <UTable
    :data="store.graphState.is3D ? data3D : data2D"
    :columns="store.graphState.is3D ? columns3D : columns2D"
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
