<script lang="ts" setup>
import type { NavigationMenuItem, TabsItem } from '@nuxt/ui'

const xvalue = ref<number>(0)
const yvalue = ref<number>(0)
const zvalue = ref<number>(0)

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

const activeTab = computed({
  get: () => store.graphDimension.is3D ? '3D' : '2D',
  set: () => {
    store.toggleDimension()
  }
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
      to: 'https://github.com/prolific-dev/convexhull-visualizer-ui/issues',
      target: '_blank'
    }
  ]
]
</script>

<template>
  <UDashboardToolbar class="grid grid-flow-row 2xl:flex justify-center w-full">
    <template #left>
      <UContainer class="grid grid-flow-row xl:grid-flow-col pt-2 xl:pt-0 gap-3 xl:gap-2 justify-center w-full">
        <UContainer class="flex items-center justify-center">
          <UTabs
            v-model="activeTab"
            :items="tabs"
            variant="pill"
            size="sm"
            class="w-40"
            :content="false"
          />
        </UContainer>
        <!-- InputNumber label for x value -->
        <UContainer class="flex items-center p-0 gap-2 min-w-[300px]">
          <span class="text-sm font-medium text-gray-700 self-center mr-1">X:</span>
          <UInputNumber
            v-model="xvalue"
            orientation="vertical"
            size="sm"
            placeholder="X"
          />
          <!-- InputNumber label for y value -->
          <span class="text-sm font-medium text-gray-700 self-center mr-1">Y:</span>
          <UInputNumber
            v-model="yvalue"
            orientation="vertical"
            size="sm"
            placeholder="Y"
          />
          <!-- InputNumber label for z value -->
          <span v-if="is3D" class="text-sm font-medium text-gray-700 self-center mr-1">Z:</span>
          <UInputNumber
            v-if="is3D"
            v-model="zvalue"
            orientation="vertical"
            size="sm"
            placeholder="Z"
          />
        </UContainer>
        <UContainer class="grid grid-cols-2 gap-2 md:flex md:flex-row md:justify-center md:gap-1 py-4">
          <UButton
            variant="solid"
            color="primary"
            size="sm"
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
          <UButton
            variant="solid"
            color="error"
            size="sm"
            @click="clear"
          >
            <UIcon name="i-lucide-trash-2" class="size-4 mr-2" />
            Clear
          </UButton>
        </UContainer>
      </UContainer>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        highlight
        class="flex flex-auto justify-center"
      />
    </template>
  </UDashboardToolbar>
</template>
