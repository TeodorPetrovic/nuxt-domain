<script setup>
// Get hostname safely on both Server and Client
const url = useRequestURL()
const host = url.hostname 

// Extract subdomain (e.g., "fir" from "fir.localhost")
const subdomain = host.includes('.') ? host.split('.')[0] : 'localhost'

// Map subdomain to the data-theme attribute value
const themeMap = {
  fir: 'fir',
  pfb: 'pfb'
}
const activeTheme = themeMap[subdomain] || 'default'

// Expose subdomain for app-wide use
const activeSubdomain = useState('activeSubdomain', () => subdomain)

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

