<template>

  <Textarea
    bodyBg="bg-purple-400"
    title="Edit note"
    v-model="noteContent">
    <template #buttons>

      <button class="slotBtn 
       text-purple-700 bg-white"
       @click="$router.push({ name: 'home' })">
        Cancel
      </button>

      <button 
       @click="saveChanges"
       class="slotBtn bg-purple-500
       text-gray-100">
        Save
      </button>

    </template>
  </Textarea>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useNotesStore } from '@/stores/note'
  import { useRouter } from 'vue-router'
  import Textarea from '@/components/notes/Textarea.vue'

  const useNotes = useNotesStore()

  const props = defineProps(['id'])
  const router = useRouter()

  const noteContent = ref('')
  noteContent.value = useNotes.getNoteContent(props.id)

  const saveChanges = () => {
    useNotes.updateChanges(props.id, noteContent.value)
    router.push({ name: 'home' })
  }
</script>
