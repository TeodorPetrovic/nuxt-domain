<script setup>
const { activeSubdomain, activeTheme } = useSubdomain()

useHead({
  htmlAttrs: {
    'data-theme': activeTheme
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

