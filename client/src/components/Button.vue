<template>
  <button type="button"
    class="px-4 py-2 w-full bg-indigo-600 text-white rounded hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 transition"
    :disabled="disabled">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>
