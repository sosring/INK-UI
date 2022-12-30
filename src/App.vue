<template>

<div class="h-screen 
 w-screen">
  <Navbar />

 <div class="mt-16 p-2 
  max-w-6xl mx-auto">


  <router-view v-slot="{ Component, route }">
   <transition name="fade" mode="out-in">
    <div :key="route.name">  
      <component :is="Component"></component>
    </div>
   </transition>
  </router-view>

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
 
html {
  -webkit-tap-highlight-color: transparent;
  height: 100%;
}
  
 ::-webkit-scrollbar { width: 0; }


 /* route */

 .fade-enter-active ,
 .fade-leave-active {
   transition: all .2s ease-out;
 }

 .fade-enter-from {
   opacity: 0;
   transform: translateY(50px);
 }

 .fade-leave-to {
   opacity: 0;
   transform: translateY(-50px);
 }
</style>
