<template>
<div v-if="condition"
 class="absolute top-0 left-0
 text-xl text-gray-600 text-center z-20 
 h-screen w-screen backdrop-blur-sm 
 flexCenter justify-center">

<div class="space-y-4">
<div class="flexCenter space-x-2">
  <div class="animate-pulse inline-block w-4 h-4 bg-current rounded-full opacity-0" role="status"></div>
  <div class="animate-pulse inline-block w-4 h-4 bg-current rounded-full opacity-0 delay-200" role="status"></div>
  <div class="animate-pulse inline-block w-4 h-4 bg-current rounded-full opacity-0 delay-300" role="status"></div>
  <div class="animate-pulse inline-block w-4 h-4 bg-current rounded-full opacity-0 delay-400" role="status"></div>
</div>
</div>
</div>

</template>

<script setup>
 const props = defineProps({
   condition: {
      type: Boolean
   }
 });
</script>
