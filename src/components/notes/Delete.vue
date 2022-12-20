<template>

  <div class="h-full w-full bg-[#00000056]
   md:backdrop-blur-sm absolute top-0 left-0
   flexCenter justify-center z-10"
   ref="modalRef">
    
    <div class="h-52 w-80 bg-white 
    overflow-hidden rounded-lg text-lg">

      <div class="h-1/5 text-end border-b-2 p-2">
        <i class="fas fa-times"
         @click="closeModal"></i>
      </div>

      <div class="h-3/5 flexCenter 
       justify-center text-sm">
        Are you sure you want to delete this ?
      </div>

      <div class="h-1/5 grid 
       grid-cols-2">

        <button
         @click="closeModal"
         class="text-green-500 
         focus:outline-none">
          Cancel
        </button>

        <button 
         @click="deleteNote"
         class="text-white bg-rose-500
         focus:outline-none">
          Delete
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useNotesStore } from '@/stores/note'
  import { onClickOutside } from '@vueuse/core'

  const useNotes = useNotesStore()

  const props = defineProps(['id', 'modelValue'])
  const emits = defineEmits(['update:modelValue'])
  const modalRef = ref('') 

  const closeModal = () => emits('update:modelValue', false) 

  onClickOutside(() => modalRef, closeModal)

  const deleteNote = () => {
    useNotes.deleteNote(props.id)
  }

  const handleKeys = e => {
    if(e.key === 'Escape') closeModal() 
  }

  onMounted(() => {
    document.addEventListener('keyup', handleKeys)
  })
  onUnmounted(() => {
    document.removeEventListener('keyup', e => console.log(e))
  })
</script>
