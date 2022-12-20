<template> 

<nav class="nav-container"
 ref="NavBarRef">
  <div class="nav-inner">

  <div class="flexCenter justify-between space-x-6">

    <RouterLink class="brand" 
     :to="{ name: 'home' }">
      Ink UI
    </RouterLink>

  <i class="fas fa-bars lg:hidden"
    @click="toggleNav"></i>
  </div>

  <div class="nav-content" v-if="showNav">

    <div class="nav-content-route"
      v-if="showNav">

     <RouterLink :to="{ name: 'home' }"
      class="links" 
      @click="toggleNav">
        Home
      </RouterLink> 
    </div>

   <div v-if="useAuth.user.id"
    class="text-end">
     <button 
     class="logoutBtn -brown"  
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

</script>

<style>

  .links.router-link-exact-active{
    color: #ce8460
  }
</style>
