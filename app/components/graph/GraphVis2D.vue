<script lang="ts" setup>
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ScatterController
} from 'chart.js'
import { Scatter } from 'vue-chartjs'
import { useStore } from '../../stores/store'
import { hu } from 'zod/locales'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  ScatterController
)

const appConfig = useAppConfig()

const store = useStore()

const data2d: GraphDataState2D = computed(() => store.graphData2D)

const hull = computed(() => store.graphData2D.hull)

const hullShape = computed(() => [...hull.value, { x: 0, y: 0 }]) // Closing the hull shape for visualization

const inner = computed(() => store.graphData2D.base)

const colinear = computed(() => store.graphData2D.colinear)

const minX = computed(() => {
  const xs = hull.value.map(point => point.x)
  return xs.length ? Math.min(...xs) : 0
})
const maxX = computed(() => {
  const xs = hull.value.map(point => point.x)
  return xs.length ? Math.max(...xs) : 0
})
const minY = computed(() => {
  const ys = hull.value.map(point => point.y)
  return ys.length ? Math.min(...ys) : 0
})
const maxY = computed(() => {
  const ys = hull.value.map(point => point.y)
  return ys.length ? Math.max(...ys) : 0
})

const chartData = computed(() => ({
  datasets: [
    {
      label: 'Convex Hull Points',
      data: hull.value,
      backgroundColor: appConfig.ui.colors.primary,
      hoverOffset: 4,
      pointRadius: 8
    },
    {
      label: 'Convex Hull Shape',
      data: hullShape.value,
      borderWidth: 1,
      pointRadius: 0,
      pointHitRadius: 0,
      hoverOffset: 0,
      showLine: true,
      fill: 'shape',
    },
    {
      label: 'Inner Points',
      data: inner.value,
      backgroundColor: appConfig.ui.colors.primary,
      hoverOffset: 4,
      pointRadius: 8
    },
    {
      label: 'Colinear Points',
      data: colinear.value,
      backgroundColor: appConfig.ui.colors.primary,
      hoverOffset: 4,
      pointRadius: 8
    }
  ]
}))

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      min: minX.value - 1,
      max: maxX.value + 1
    },
    y: {
      type: 'linear',
      position: 'left',
      min: minY.value - 1,
      max: maxY.value + 1
    },
  },
})
</script>

<template>
  <Scatter :data="chartData" :options="chartOptions" />
</template>

<style></style>
