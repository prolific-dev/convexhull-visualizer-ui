<script setup lang="ts">
import { ref, watch } from 'vue'
import type { NavigationMenuItem, TabsItem } from '@nuxt/ui'
import { useStore } from '~/stores/store'

const xvalue = ref(0)
const yvalue = ref(0)
const zvalue = ref(0)

const store = useStore()

const is3D = computed(() => store.graphState.is3D)

// activeTab mirrors store.graphState.is3D: '3D' when true, '2D' when false
const activeTab = ref(store.graphState.is3D ? '3D' : '2D')

// Keep store in sync when tab changes
watch(activeTab, (v) => {
  store.graphState.is3D = v === '3D'
})

// Keep tab UI in sync when store changes externally
watch(() => store.graphState.is3D, (val) => {
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

const { isNotificationsSlideoverOpen } = useDashboard()
</script>

<template>
  <UDashboardPanel id="chart">
    <template #header>
      <UDashboardNavbar title="Chart Page" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>
        </template>
      </UDashboardNavbar>

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
            >
              <UIcon name="i-lucide-plus" class="size-4 mr-2" />
              Add
            </UButton>
            <UButton variant="solid" color="primary" size="sm">
              <UIcon name="i-lucide-upload" class="size-4 mr-2" />
              Upload Data
            </UButton>
            <UButton variant="solid" color="error" size="sm">
              <UIcon name="i-lucide-trash-2" class="size-4 mr-2" />
              Clear All
            </UButton>
          </UContainer>
        </template>

        <template #right>
          <UNavigationMenu :items="items" highlight class="flex-1" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <!-- Add chart content here -->
      <GraphInfo />
      <Graph />
      <GraphTable />
    </template>
  </UDashboardPanel>
</template>
