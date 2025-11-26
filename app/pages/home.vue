<script lang="ts" setup>
definePageMeta({
  title: 'Home',
  layout: 'default'
})

const { isNotificationsSlideoverOpen } = useDashboard()

const links = ref([
  {
    label: 'Launch Visualizer',
    to: '/home',
    icon: 'i-lucide-square-play'
  },
  {
    label: 'API Documentation',
    to: '/api-docs',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])

const cards = ref([
  {
    title: 'Cinematic Hero View',
    description: 'Navigate scenes effortlessly with fluid orbit, pan, and zoom controls across 2D and 3D modes.',
    icon: 'i-lucide-smile',
    to: '/chart'
  },
  {
    title: 'Algorithm Agility',
    description: 'Switch between algorithms like Quickhull and Graham Scan, adjust iteration depth, and inspect each step with the live stepper.',
    icon: 'i-lucide-a-large-small',
    to: '/chart'
  },
  {
    title: 'Data-Ready Workspace',
    description: 'Jump in using curated datasets from /api/2data/ and /api/3data/, or import your own points and weights for full control.',
    icon: 'i-lucide-sun-moon',
    to: '/api-docs'
  },
  {
    title: 'Insightful Metrics',
    description: 'View live performance stats like runtime, hull size, and iteration counts as algorithms execute.',
    icon: 'i-lucide-gauge',
    to: '/chart'
  },
  {
    title: 'Interactive Editing',
    description: 'Add, drag, and remove points directly on the canvas to instantly see how the convex hull reacts.',
    icon: 'i-lucide-pointer',
    to: '/chart'
  },
  {
    title: 'Export & Share',
    description: 'Save images, export point sets, or share configuration presets to revisit and replicate visualizations.',
    icon: 'i-lucide-share-2',
    to: '/chart'
  }
])

const reasons = ref([
  {
    title: 'Interactive Visualization',
    description: 'Explore dynamic 2D and 3D convex hull representations to understand algorithm mechanics intuitively.',
    orientation: 'horizontal',
    reverse: false,
    features: [
      {
        name: 'Dynamic Views',
        description: 'Switch seamlessly between 2D and 3D perspectives to study convex hull structures in depth.',
        icon: 'i-lucide-refresh-cw'
      },
      {
        name: 'User Controls',
        description: 'Use intuitive zoom, pan, and rotation controls to inspect points and hulls precisely.',
        icon: 'i-lucide-move'
      },
      {
        name: 'Step-by-Step Animation',
        description: 'Follow each algorithmic step through smooth, guided animations for clearer understanding.',
        icon: 'i-lucide-play-circle'
      }
    ],
    image: '/img/landing2.png'
  },
  {
    title: 'Algorithm Comparison',
    description: 'Compare multiple convex hull algorithms side by side to understand their strengths and trade-offs.',
    orientation: 'horizontal',
    reverse: true,
    features: [
      {
        name: 'Multiple Algorithms',
        description: 'Experiment with algorithms like Quickhull, Graham Scan, and more to see how each performs.',
        icon: 'i-lucide-shuffle'
      },
      {
        name: 'Performance Metrics',
        description: 'View real-time insights such as execution time, iteration counts, and complexity indicators.',
        icon: 'i-lucide-bar-chart-2'
      },
      {
        name: 'Visual Highlights',
        description: 'Clearly highlight decisions and key steps taken by each algorithm for easy comparison.',
        icon: 'i-lucide-highlighter'
      }
    ],
    image: '/img/landing3.png'
  },
  {
    title: 'Learning & Experimentation',
    description: 'Enhance your computational geometry learning experience through experimentation and custom inputs.',
    orientation: 'horizontal',
    reverse: false,
    features: [
      {
        name: 'Custom Point Sets',
        description: 'Manually add, remove, or randomize points to observe how hulls change in real time.',
        icon: 'i-lucide-mouse-pointer'
      },
      {
        name: 'Algorithm Insights',
        description: 'Access explanations, diagrams, and tooltips that break down geometric concepts.',
        icon: 'i-lucide-lightbulb'
      },
      {
        name: 'Export & Sharing',
        description: 'Save visualizations or export point sets to share experiments and results with others.',
        icon: 'i-lucide-share-2'
      }
    ],
    image: '/img/landing4.png'
  }
])
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Home" :ui="{ right: 'gap-3' }">
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
    </template>

    <template #body>
      <!-- HERO -->
      <UPageHero
        title="Welcome to the Convex Hull Visualizer"
        description="An interactive tool to visualize and understand convex hull algorithms."
        headline="New Release v0.0.1 Alpha"
        orientation="horizontal"
        :links="links"
      >
        <template #top>
          <HeroBackground />
        </template>
        <img
          src="/img/landing1.png"
          alt="App screenshot"
          class="rounded-lg shadow-2xl ring ring-default"
        >
      </UPageHero>
      <!-- REASONS -->
      <UPageSection
        v-for="(reason, index) in reasons"
        :key="index"
        :title="reason.title"
        :description="reason.description"
        :orientation="reason.orientation"
        :reverse="reason.reverse"
        :features="reason.features"
      >
        <!--
          <ImagePlaceholder />
        -->
        <img
          :src="reason.image"
          :alt="`Illustration for ${reason.title}`"
          class="rounded-lg shadow-2xl ring ring-default"
        >
      </UPageSection>

      <!-- CARDS -->
      <UPageSection
        title="Built for visual impact and clarity"
        description="From classroom walkthroughs to engineering reviews, every control is designed to surface the hull quickly and make the story obvious."
      >
        <UPageGrid>
          <UPageCard
            v-for="(card, index) in cards"
            :key="index"
            v-bind="card"
            spotlight
          />
        </UPageGrid>
      </UPageSection>
    </template>
  </UDashboardPanel>
</template>
