<script lang="ts" setup>
import type { NavigationMenuItem, TabsItem } from '@nuxt/ui'

const xvalue = ref(0)
const yvalue = ref(0)
const zvalue = ref(0)

const store = useStore()

const is3D = computed(() => store.graphDimension.is3D)

async function addPoint() {
  if (is3D.value) {
    await store.addPoint3D({ x: xvalue.value, y: yvalue.value, z: zvalue.value })
  } else {
    await store.addPoint2D({ x: xvalue.value, y: yvalue.value })
  }
}

async function removePoint() {
  if (is3D.value) {
    await store.removePoint3D({ x: xvalue.value, y: yvalue.value, z: zvalue.value })
  } else {
    await store.removePoint2D({ x: xvalue.value, y: yvalue.value })
  }
}

function clear() {
  if (is3D.value) {
    store.clear3D()
  } else {
    store.clear2D()
  }
}

// activeTab mirrors store.graphDimension.is3D: '3D' when true, '2D' when false
const activeTab = ref(store.graphDimension.is3D ? '3D' : '2D')

// Keep store in sync when tab changes
watch(activeTab, (v) => {
  store.graphDimension.is3D = v === '3D'
})

// Keep tab UI in sync when store changes externally
watch(() => store.graphDimension.is3D, (val) => {
  activeTab.value = val ? '3D' : '2D'
})

const items: NavigationMenuItem[] = [
  [
    {
      label: 'Documentation',
      icon: 'i-lucide-book-open',
      to: 'https://github.com/prolific-dev/convexhull-visualizer-ui',
      target: '_blank'
    },
    {
      label: 'Help & Feedback',
      icon: 'i-lucide-help-circle',
      to: 'https://github.com/prolific-dev/convexhull-visualizer-ui',
      target: '_blank'
    }
  ]
]

const tabs: TabsItem[] = [
  {
    label: '2D',
    value: '2D',
  },
  {
    label: '3D',
    value: '3D'
  }
]
</script>

<template>
  <UDashboardToolbar class="shrink-0 flex items-center justify-between border-p border-default px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]">
    <template #left>
      <UContainer class="flex items-center space-x-2">
        <UTabs
          v-model="activeTab"
          :items="tabs"
          variant="pill"
          size="sm"
          class="w-40"
          :content="false"
        />
        <!-- InputNumber label for x value -->
        <span class="text-sm font-medium text-gray-700 self-center ml-4 mr-1">X:</span>
        <UInputNumber
          v-model="xvalue"
          orientation="vertical"
          size="sm"
          placeholder="X"
        />
        <!-- InputNumber label for y value -->
        <span class="text-sm font-medium text-gray-700 self-center ml-4 mr-1">Y:</span>
        <UInputNumber
          v-model="yvalue"
          orientation="vertical"
          size="sm"
          placeholder="Y"
        />
        <!-- InputNumber label for z value -->
        <span v-if="is3D" class="text-sm font-medium text-gray-700 self-center ml-4 mr-1">Z:</span>
        <UInputNumber
          v-if="is3D"
          v-model="zvalue"
          orientation="vertical"
          size="sm"
          placeholder="Z"
        />
        <UButton
          variant="solid"
          color="primary"
          size="sm"
          class="ml-4"
          type="button"
          @click="addPoint"
        >
          <UIcon name="i-lucide-plus" class="size-4 mr-2" />
          Add
        </UButton>
        <UButton
          variant="solid"
          color="primary"
          size="sm"
          type="button"
          @click="removePoint"
        >
          <UIcon name="i-lucide-minus" class="size-4 mr-2" />
          Remove
        </UButton>
        <UButton variant="solid" color="warning" size="sm">
          <UIcon name="i-lucide-upload" class="size-4 mr-2" />
          Upload
        </UButton>
        <UButton variant="solid" color="error" size="sm" @click="clear">
          <UIcon name="i-lucide-trash-2" class="size-4 mr-2" />
          Clear
        </UButton>
      </UContainer>
    </template>

    <template #right>
      <UNavigationMenu :items="items" highlight class="flex-1" />
    </template>
  </UDashboardToolbar>
</template>
