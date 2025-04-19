<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700 text-sm font-semibold mb-2">
      {{ label }}
    </label>
    <div class="relative">
      <input :id="id" :type="typeToUse" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder" :class="inputClasses" :required="required" />
      <button v-if="type === 'password'" type="button" @mousedown="showPassword = true" @mouseup="showPassword = false"
        @mouseleave="showPassword = false"
        class="absolute top-0 right-0 h-full px-4 border border-gray-300 rounded-tr-lg rounded-br-lg bg-white text-sm text-indigo-600 hover:bg-gray-100 active:bg-gray-200 transition">
        Show
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  id: String,
  label: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])

const showPassword = ref(false)

const typeToUse = computed(() => {
  return props.type === 'password' && showPassword.value ? 'text' : props.type
})

const inputClasses = computed(() => [
  'w-full', 'pl-4', 'py-2', 'border', 'rounded-lg',
  'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500',
  props.type === 'password' ? 'pr-24' : 'pr-4',
])
</script>
