<template>
  <div ref="plotlyChart"></div>
</template>

<script lang="ts" setup>
import Plotly from 'plotly.js-dist-min'
import type { Point3D } from '~/types/point'

const colorMode = useColorMode()
const appConfig = useAppConfig()

const store = useStore()
const plotlyChart = ref<HTMLDivElement | null>(null)

const config = {
  responsive: true,
  displaylogo: false
}

const layout = {
  xaxis: {
    range: [0, 10],
    backgroundcolor: 'rgba(50,23,120,20)',
    gridcolor: 'rgba(50,23,120,20)',
  },
  yaxis: {
    range: [0, 10],
  },
  zaxis: {
    range: [0, 10],
  },
  legend: {
    orientation: 'h',
  },
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
  },
  paper_bgcolor: 'rgba(50,23,120,20)',
  plot_bgcolor: 'rgba(50,23,120,20)',
}

const input = computed(() => store.graphData3D.input)
const hull = computed(() => store.graphData3D.hull)
const inner = computed(() => store.graphData3D.inner)

const trace1 = {
  x: hull.value.map((p: Point3D) => p.x),
  y: hull.value.map((p: Point3D) => p.y),
  z: hull.value.map((p: Point3D) => p.z),
  mode: 'markers',
  type: 'scatter3d',
  connectgaps: true,
  alphahull: 7,
  marker: {
    color: appConfig.ui.colors.primaryHull,
    size: 8,
    line: {
      color: colorMode.value === 'dark' ? 'white' : 'neutral',
      width: 2,
    },
  },
}

const trace2 = {
  x: inner.value.map((p: Point3D) => p.x),
  y: inner.value.map((p: Point3D) => p.y),
  z: inner.value.map((p: Point3D) => p.z),
  mode: 'markers',
  type: 'scatter3d',
  connectgaps: true,
  alphahull: 7,
  marker: {
    color: appConfig.ui.colors.primaryInner,
    size: 8,
    line: {
      color: colorMode.value === 'dark' ? 'white' : 'neutral',
      width: 2,
    },
  },
}

function restylePlot() {
  if (plotlyChart.value) {
    Plotly.restyle(plotlyChart.value, {
      // 'marker.color': appConfig.ui.colors.primary,
      'line.color': colorMode.value === 'dark' ? 'white' : 'black',
    })

    Plotly.relayout(plotlyChart.value, {
      paper_bgcolor: colorMode.value === 'dark'
        ? 'darkgray'
        : 'white',
      plot_bgcolor: colorMode.value === 'dark'
        ? 'darkgray'
        : 'white',
    })
  }
}

onMounted(() => {
  if (plotlyChart.value) {
    Plotly.newPlot(plotlyChart.value, [trace1, trace2], layout, config)
    restylePlot()
  }
})

watch([colorMode, () => appConfig.ui.colors.primary], () => {
  restylePlot()
})

watch(input, (newInput) => {
  trace1.x = newInput.map((p: Point3D) => p.x)
  trace1.y = newInput.map((p: Point3D) => p.y)
  trace1.z = newInput.map((p: Point3D) => p.z)
  restylePlot()
})
</script>
