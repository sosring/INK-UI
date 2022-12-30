<template>

<Textarea v-model="modelValue"
 ref="textareaRef">
  <template #buttons>

    <button 
     @click="addNote"
     class="py-3 px-6 rounded-md bg-indigo-400 
     text-white shadow-lg focus:outline-none"
     :class="{ 'cursor-not-allowed bg-gray-600':
     !modelValue.length }">
      Add
    </button>
 </template>
</Textarea>

 <Loading v-auto-animate
 :condition="!useNotes.noteLoaded" />

<div v-if="useNotes.noteLoaded"
 class="my-4 flex space-x-4">

  <button 
   class="py-2 px-4 rounded-md 
   shadow-lg text-white bg-indigo-500"
   @click="showAll = !showAll">
    {{ showAll ? 'Only Fav' : 'Show All'}}
  </button>
</div>


<div 
 v-if="useNotes.noteLoaded"
 class="grid sm:grid-cols-2 
 lg:grid-cols-3 my-6 gap-4 
 overflow-y-auto">

  <Note 
   v-for="note in filterNotes"
   :note="note" />
</div>

<div class="text-center my-4 
 text-xl text-gray-400"
 v-if="!filterNotes.length">

 Empty ...
</div>


</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useNotesStore } from '@/stores/note'
  import { vAutoAnimate } from '@formkit/auto-animate'
  import Textarea from '@/components/notes/Textarea.vue'
  import Note from '@/components/notes/Note.vue'
  import Loading from '@/components/layouts/Loading.vue'

  const useNotes = useNotesStore()

  const modelValue = ref('')
  const textareaRef = ref('')
  
  const addNote = () => {
    if(modelValue.value === '' || modelValue.value === ' '){
      alert('Please add a note!')
      textareaRef.value.focusText()
      return 
    }

    useNotes.addNote(modelValue.value)
    modelValue.value = ''

    if(window.innerWidth >= 1024){
      textareaRef.value.focusText()
    }
  }

  onMounted(() => {
    if(window.innerWidth >= 1024){
      textareaRef.value.focusText()
    }
  })

  const showAll = ref(true)

  const filterNotes = computed(() => {
     if(!showAll.value){
       return useNotes.notes.filter(note =>  note.fav === true) 
     }

     return useNotes.notes
  })
</script>
