<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const toast = useToast()

const open = ref(false)

const links = [
  [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      to: '/home',
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: 'Chart',
      icon: 'i-lucide-bar-chart-2',
      to: '/chart',
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: 'API',
      icon: 'i-lucide-code',
      to: '/api-docs',
      onSelect: () => {
        open.value = false
      }
    },
    {
      label: 'Settings',
      to: '/settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      type: 'trigger',
      children: [
        {
          label: 'General',
          to: '/settings',
          exact: true,
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: 'Chart',
          to: '/settings/chartsettings',
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: 'Billing',
          to: '/settings/billing',
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: 'Notifications',
          to: '/settings/notifications',
          onSelect: () => {
            open.value = false
          }
        },
        {
          label: 'Security',
          to: '/settings/security',
          onSelect: () => {
            open.value = false
          }
        }
      ]
    }
  ],
  [
    {
      label: 'Feedback',
      icon: 'i-lucide-message-circle',
      to: 'https://github.com/prolific-dev/convexhull-visualizer-ui/issues',
      target: '_blank'
    },
    {
      label: 'Help & Support',
      icon: 'i-lucide-info',
      to: 'https://github.com/prolific-dev/convexhull-visualizer-ui/issues',
      target: '_blank'
    }
  ]
] satisfies NavigationMenuItem[][]

const groups = computed(() => [
  {
    id: 'links',
    label: 'Go to',
    items: links.flat()
  },
  {
    id: 'code',
    label: 'Code',
    items: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'i-simple-icons-github',
        to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
        target: '_blank'
      }
    ]
  }
])

onMounted(async () => {
  const cookie = useCookie('cookie-consent')
  if (cookie.value === 'accepted') {
    return
  }

  toast.add({
    title:
      'We use first-party cookies to enhance your experience on our website.',
    duration: 0,
    close: false,
    actions: [
      {
        label: 'Accept',
        color: 'neutral',
        variant: 'outline',
        onClick: () => {
          cookie.value = 'accepted'
        }
      },
      {
        label: 'Opt out',
        color: 'neutral',
        variant: 'ghost'
      }
    ]
  })
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25 gap-6"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <UContainer class="pt-8 text-lg font-semibold min-h-[120px]">
          <div :class="collapsed ? 'flex flex-col items-center' : 'flex flex-col items-center whitespace-nowrap'">
            <img
              src="/img/convex_hull_transparent_bg.png"
              alt="Convex Hull Visualizer Logo"
              class="w-14 h-14"
            >
            <p v-show="!collapsed" class="font-semibold text-sm">Convex Hull Visualizer v0.0.1 Alpha</p>
          </div>
        </UContainer>
      </template>

      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          class="bg-transparent ring-default"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>
    <UDashboardSearch :groups="groups" />
    <slot></slot>
    <!--
      <NotificationsSlideover />
    -->
  </UDashboardGroup>
</template>
