<template>

  <div class="p-3 
  rounded-md shadow-md"
  :class="bodyBg">
    <h1 class="mb-2 
     text-xl text-white">
     {{ title }}
     </h1>

    <textarea 
     ref="textareaRef"
     :value="modelValue"
     @input="event => $emit('update:modelValue', 
     event.target.value)" v-focus
     class="resize-none h-32 w-full p-2 
     focus:outline-none overflow-y-scroll">

    </textarea>

      <div class="text-end p-2 space-x-4">
        <slot name="buttons" />
      </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { vFocus } from '@/directives/vFocus.js'

  const props = defineProps({
    modelValue: {
      type: String,
      required: true
    },
    bodyBg: {
      type: String,
      default: 'bg-indigo-500'
    },
    title: {
      type: String,
      default: ''
    }
  })

  const textareaRef = ref('')

  const focusText = () => textareaRef.value.focus()

  defineExpose({
    focusText
  })
</script>
