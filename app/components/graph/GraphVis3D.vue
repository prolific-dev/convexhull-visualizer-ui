<template>
  <div ref="plotlyChart"></div>
</template>

<script lang="ts" setup>
import Plotly from 'plotly.js-dist-min'

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

const trace1 = {
  x: store.graphData3D.input.map((point) => point.x),
  y: store.graphData3D.input.map((point) => point.y),
  z: store.graphData3D.input.map((point) => point.z),
  mode: 'markers',
  type: 'scatter3d',
  connectgaps: true,
  alphahull: 7,
  marker: {
    color: appConfig.ui.colors.primary,
    size: 12,
    line: {
      color: colorMode.value === 'dark' ? 'white' : 'neutral',
      width: 2,
    },
  },
}

function restylePlot() {
  if (plotlyChart.value) {
    Plotly.restyle(plotlyChart.value, {
      'marker.color': appConfig.ui.colors.primary,
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
    Plotly.newPlot(plotlyChart.value, [trace1], layout, config)
    restylePlot()
  }
})

watch([colorMode.value, () => appConfig.ui.colors.primary], () => {
  restylePlot()
})
</script>
