<template>

  <div :key="note.id"
   class="rounded-md shadow-lg bg-purple-300 
   rounded-md text-gray-600 text-lg p-3">

  <div class="relative">
  <textarea class="h-32 p-2 resize-none 
   relative bg-[transparent] w-full
   focus:outline-none focus:border
   focus:border-purple-600 relative"
   :disabled="textDisable"
   v-model="noteContent"/>

    <i class="fas fa-star absolute top-2 right-2 shadow-xl"
     :class="note.fav ? 'text-indigo-600' : 'text-purple-400'"
     @click="addFav">
    </i>
  </div>

  <span class="flexCenter 
  justify-between text-sm py-2">
   <div>
    {{ formatted }}
   </div>

   <div>
     {{ note.content.split(' ').length }}
     {{ computeWords }}
   </div>
  </span>

  <div class="h-12 grid grid-cols-2 gap-2">

    <button class="noteBtn 
     bg-purple-500 text-white"
     :class="{ 'bg-teal-500' : !textDisable }"
     @click="editNote">
      {{ textDisable ?  'Edit' : 'Save' }}
    </button>

    <button class="rounded-md
     text-gray-500 bg-white"
     @click="deleteNote">
      {{ textDisable ? 'Delete' : 'Cancel' }}
    </button>
  </div>
  
    <DeleteModal 
     :id="note.id"
     v-if="showModal"
     v-model="showModal" />

  </div>
</template>

<script setup>
  import { ref, computed  } from 'vue'
  import { useNotesStore } from '@/stores/note.js'
  import { useDateFormat, useNow } from '@vueuse/core'
  import DeleteModal from '@/components/notes/Delete.vue' 

  const useNotes = useNotesStore()

  const formatted = computed(() => {
    const date = new Date(parseInt(props.note.date))
    const format = useDateFormat(date, 'DD-MM-YY HH:mm')
    return format.value 
  })

  const props = defineProps({
    note: {
      type: Object,
      required: true
    }
  })

  const computeWords = computed(() => {
    return props.note.content.split(' ').length <= 1 ? 'Word' : 'Words'
  })

  const addFav = () => {
    const condition = props.note.fav = !props.note.fav
    useNotes.updateFav(props.note.id, condition)
  }

  const showModal = ref(false)
  const textDisable = ref(true)

  const noteContent = ref('')
  noteContent.value = props.note.content 

  const deleteNote = () => {
    if(textDisable.value === true){
      showModal.value = true
    }

    noteContent.value = props.note.content
    textDisable.value = true
  }

  const  editNote = () => {
    if(textDisable.value === false){ 
      useNotes.updateChanges(props.note.id, noteContent.value)
      console.log('save')
    }

    textDisable.value = !textDisable.value
  }
</script>
