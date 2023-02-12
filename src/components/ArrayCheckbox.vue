<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({

  /**
   * 値を追加する配列
   */
  modelValue: {
    type: Array,
    required: true,
  },

  /**
   * チェック時に配列に追加する値
   */
  item: {
    type: null,
    required: true,
  },

  /**
   * ラベルとして表示する値
   */
  label: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const checked = computed({
  get() {
    return props.modelValue.includes(props.item)
  },
  set(state: boolean) {
    emit('update:modelValue', state
      ? [...props.modelValue, props.item]
      : props.modelValue.filter(item => item !== props.item))
  },
})
</script>

<template>
  <label>
    <input
      v-model="checked"
      type="checkbox"
    >
    <span>
      {{ label }}
    </span>
  </label>
</template>
