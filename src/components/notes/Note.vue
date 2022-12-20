<template>

  <div :key="note.id"
   class="rounded-md shadow-lg bg-purple-300 
   rounded-md text-gray-600 text-lg p-3">

  <div class="overflow-y-scroll h-32 p-2 relative">

    <i class="fas fa-star absolute top-2 right-2 shadow-xl"
     :class="note.fav ? 'text-indigo-600' : 'text-purple-400'"
     @click="addFav">
    </i>

    {{ note.content }}
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
     @click="$router.push({ name: 'edit', 
     params: { id: note.id }})">
      Edit
    </button>

    <button class="rounded-md
     text-gray-500 bg-white"
     @click="deleteNote">
      Delete
    </button>
  </div>
  
    <DeleteModal 
     v-if="showModal"
     :id="note.id"
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

  const showModal = ref(false)

  const deleteNote = () => {
    showModal.value = true
  }

  const computeWords = computed(() => {
    return props.note.content.split(' ').length <= 1 ? 'Word' : 'Words'
  })

  const addFav = () => {
    const condition = props.note.fav = !props.note.fav
    useNotes.updateFav(props.note.id, condition)
  }
</script>
