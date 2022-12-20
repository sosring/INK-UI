<template>

<div class="h-screen w-screen
 overflow-scroll bg-gray-100">
  <Navbar />

 <div class="mt-16
  max-w-6xl p-2 mx-auto">

  <RouterView />
 </div>
</div>
</template>

<script setup>
  import { onMounted } from 'vue'
  import Navbar from '@/components/layouts/Navbar.vue'
  import { useAuthStore } from './stores/auth'

  const useAuth = useAuthStore()

  onMounted(() => useAuth.init())
</script>

<style>
  #app {
    --webkit-tap-hightlight-color: transparent;
  }
</style>
