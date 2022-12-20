<template>

 <div class="formCont">

    <div class="tabs" 
    @click="register = false"
    :class="{ 'isActive': !register }">
      Login
   </div> 

    <div class="tabs" 
    @click="register = true"
    :class="{ 'isActive': register }">
      Register
   </div>
 </div>

<div class="mx-auto max-w-xs">

 <form class="formInputCont"
  @submit.prevent="authUser">
    
  <div class="mb-6">
   <label class="formLabel">
      Email
   </label>

   <input type='email' 
    class="formInput"
    placeholder="Example - JohnDoe@gmail.com"
    v-model="credentials.email">
  </div>
    
  <div class="mb-6">
   <label class="formLabel">
      Password
   </label>

   <input type='password' 
    class="formInput"
    placeholder="john12xU*ff"
    v-model="credentials.password">
  </div>

  <div class="text-end">

   <input type="submit"
    class="formSubmit bg-indigo-500"
    :value="register ? 'Register' : 'Login'" >
  </div>
 </form>

  <div class="grid grid-cols-2 gap-2">

   <button class="formBtn 
    bg-gray-600 transition-color"
    @click="useAuth.signInWithGoogle">
    <p>
    <i class="fab fa-google"></i>
    Google
    </p>
   </button>

   <button class="formBtn 
    bg-emerald-500 transition-color"
    @click="useAuth.Demo">
     <p> Demo </p>
  </button>
 </div>

</div>

</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  import { useAuthStore } from '@/stores/auth'

  const useAuth = useAuthStore()
  const register = ref(false) 

  const credentials = reactive({
    email: '',
    password: ''
  })

  const authUser = () => {
    if(!credentials.email || !credentials.password){
      alert('Invalid input') 
      return 
    }

    if(register.value){
     useAuth.registerUser(credentials) 
    } 
    else if(!register.value){
     useAuth.signInUser(credentials)
    }
  }
</script>
