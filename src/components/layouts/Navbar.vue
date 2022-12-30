<template> 

<nav class="navContainer bg-white"
 ref="NavBarRef">

  <div class="innerNav" v-auto-animate>

  <div class="flexCenter justify-between space-x-6">

   <div class="flexCenter space-x-1 cursor-pointer"
     @click="$router.push({ name: 'home' })">
    <img src="../../../favi.png"
     class="h-8 w-8 object-cover">

    <h3 class="brand font-bold text-lg">
      Ink UI
    </h3>
    </div>

  <i class="fas fa-bars lg:hidden"
    v-if="useAuth.user.id"
    @click="toggleNav"></i>
  </div>

  <div 
   class="navContent"
   v-if="showNav">

    <div class="routerContainer"
     v-if="useAuth.user.id">

     <RouterLink v-for="route in routes" 
      class="links text-gray-800 text-base" 
      :to="{ name: route.path }"
      @click="toggleNav">
        {{ route.name }}
      </RouterLink> 

     <button 
     class="signOutBtn"  
     @click="userSignOut">
       Logout {{ useAuth.user.email }}
    </button>
   </div>

  </div>

  </div>
</nav>

</template> 

<script setup>
 import { ref } from 'vue'
 import { onClickOutside } from '@vueuse/core'
 import { useAuthStore } from '@/stores/auth'
 import { vAutoAnimate } from '@formkit/auto-animate'

 const useAuth = useAuthStore()

 const NavBarRef = ref(null)

 const showNav = ref(null)
 const screenWidth = ref(null)

 const toggleNav = () => {
   screenWidth.value <= 1024 ? showNav.value = !showNav.value : showNav.value
 }

 onClickOutside(() => NavBarRef, () => {
   screenWidth.value <= 1024 ? showNav.value = false : showNav.value
 },
 { ignore: [NavBarRef] })

 const checkScreen = () => {
   screenWidth.value = window.innerWidth
   screenWidth.value <= 1024 ? showNav.value = false : showNav.value = true 
 }
 checkScreen()
 window.addEventListener('resize', checkScreen)

 const userSignOut = () => {
   useAuth.signOutUser()
   toggleNav()
 }

 const routes = [
   { name: 'Home', path: 'home' },
   { name: 'About', path: 'about' }
 ]

</script>

<style>

  .links.router-link-exact-active{
    color: #ce8460
  }
</style>
