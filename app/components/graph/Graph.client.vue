<template>
  <UCard
    ref="cardRef"
    :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }"
  >
    <template #header>
      <div>
        <p v-if="!is3D" class="text-xs text-muted uppercase mb-1.5">
          Convex Hull Visualization 2D
        </p>
        <p v-else class="text-xs text-muted uppercase mb-1.5">
          Convex Hull Visualization 3D
        </p>
      </div>
    </template>
    <GraphVis2D v-if="!is3D" />
    <GraphVis3D v-else />
  </UCard>
</template>

<script lang="ts" setup>
import { useStore } from '../../stores/store'

const store = useStore()

const is3D = computed(() => store.graphState.is3D)
</script>

<style></style>
