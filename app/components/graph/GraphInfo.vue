<script setup lang="ts">
const store = useStore()

const is3D = computed(() => store.graphDimension.is3D)

const numHullPoints = computed(() => is3D.value ? store.graphData3D.hull.length : store.graphData2D.hull.length)
const numInnerPoints = computed(() => is3D.value ? store.graphData3D.inner.length : store.graphData2D.inner.length)
const numColinearPoints = computed(() => is3D.value ? store.graphData3D.colinear?.length : store.graphData2D.colinear?.length)

const totalPoint = computed(() => is3D.value ? store.graphData3D.input.length : store.graphData2D.input.length)

const baseStats = [
  {
    title: 'Number of Data Points',
    icon: 'i-lucide-database',
    value: totalPoint,
    percentage: computed(() => 100),
  },
  {
    title: 'Convex Hull Points',
    icon: 'i-lucide-circle',
    value: numHullPoints,
    percentage: computed(() => {
      const total = totalPoint.value || 0
      return total ? Math.round((numHullPoints.value / total) * 100) : 0
    }),
  },
  {
    title: 'Inner Points',
    icon: 'i-lucide-circle-dot',
    value: numInnerPoints,
    percentage: computed(() => {
      const total = totalPoint.value || 0
      return total ? Math.round((numInnerPoints.value / total) * 100) : 0
    }),
  },
  {
    title: 'Colinear Points',
    icon: 'i-lucide-git-commit-horizontal',
    value: numColinearPoints,
    percentage: computed(() => {
      const total = totalPoint.value || 0
      return total ? Math.round(((numColinearPoints.value ? numColinearPoints.value : 0) / total) * 100) : 0
    }),
  }
]
</script>

<template>
  <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
    <UPageCard
      v-for="(stat, index) in baseStats"
      :key="index"
      :icon="stat.icon"
      :title="stat.title"
      variant="subtle"
      :ui="{
        container: 'gap-y-1.5',
        wrapper: 'items-start',
        leading:
          'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
        title: 'font-normal text-muted text-xs uppercase'
      }"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg hover:z-1"
    >
      <div class="flex items-center gap-2">
        <span class="text-2xl font-semibold text-highlighted">
          {{ stat.value }}
        </span>

        <UBadge
          :color="stat.percentage.value != 0 ? 'success' : 'error'"
          variant="subtle"
          class="text-xs"
        >
          {{ stat.percentage.value }}%
        </UBadge>
      </div>
    </UPageCard>
  </UPageGrid>
</template>
