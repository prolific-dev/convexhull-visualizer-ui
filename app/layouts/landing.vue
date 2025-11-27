<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const headerItems: NavigationMenuItem[] = [
  {
    label: 'Start',
    to: '/chart',
    active: route.path.startsWith('/chart')
  },
  {
    label: 'Documentation',
    to: '/docs',
    active: route.path.startsWith('/docs')
  },
  {
    label: 'Releases',
    to: 'https://github.com/prolific-dev/convexhull-visualizer-ui/releases',
    target: '_blank'
  }
]
</script>

<template>
  <UHeader>
    <template #title>
      <img src="/img/convex_hull_transparent_bg.png" alt="App Logo" class="h-16 w-auto">
    </template>

    <UNavigationMenu :items="headerItems" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/prolific-dev/convexhull-visualizer-ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>
  </UHeader>
  <NuxtPage />
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">Copyright © {{ new Date().getFullYear() }} Convex Hull Visualizer. All rights reserved.</p>
    </template>

    <template #right>
      <UButton
        icon="i-simple-icons-discord"
        color="neutral"
        variant="ghost"
        to="https://discord.com/invite/prolific-dev"
        target="_blank"
        aria-label="Discord"
      />
      <UButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        to="https://x.com/prolific_dev"
        target="_blank"
        aria-label="X"
      />
      <UButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/prolific-dev"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>
