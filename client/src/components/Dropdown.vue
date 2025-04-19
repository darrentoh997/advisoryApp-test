<template>
  <div class="mb-4">
    <label :for="id" class="block text-gray-700 text-sm font-semibold mb-2">
      {{ label }}
    </label>
    <select :id="id" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2 border rounded-lg bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
      <option disabled value="" class="text-gray-400 font-normal">-- Select --</option>
      <option v-for="option in options" :key="option.value" :value="option.value" class="text-gray-800 font-semibold">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  id: String,
  label: String,
  modelValue: [String, Number],
  options: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['update:modelValue'])
</script>
