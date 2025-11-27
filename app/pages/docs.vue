<script setup lang="ts">
definePageMeta({
  title: 'API Documentation',
  layout: 'default'
})

const { data: page } = await useAsyncData('api-docs', () => {
  return queryCollection('content')
    .path('/api-docs')
    .first()
})
</script>

<template>
  <UDashboardPanel id="api-docs" :ui="{ body: 'lg:py-10' }">
    <template #header>
      <UDashboardNavbar title="API Documentation">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="mx-auto max-w-4xl px-4 lg:px-0">
        <ContentRenderer v-if="page" :value="page" />

        <div v-else>
          <h1>ConvexHull Visualizer API — Quick Start</h1>
          <p>api-docs.md not found or not loaded yet.</p>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
