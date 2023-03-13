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

  /**
   * 背景色
   */
  color: {
    type: String,
    default: 'rgb(0, 0, 0, 0)',
  },

  /**
   * 非活性化どうか
   */
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'check', 'uncheck'])

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

function onInput(event: Event) {
  if (!(event.target instanceof HTMLInputElement))
    return

  if (event.target.checked)
    emit('check')

  else
    emit('uncheck')
}
</script>

<template>
  <label
    class="
      p-2 text-center transition
      focus-within:outline-dotted focus-within:outline-slate-500
      focus-within:outline-2 focus-within:outline-offset-2
    "
    :class="[
      disabled ? 'cursor-default' : 'cursor-pointer hover:bg-slate-100',
      checked && 'bg-slate-300',
    ]"
    :style="{ background: checked && !disabled ? color : '' }"
  >
    <input
      v-model="checked"
      class="opacity-0 w-0"
      type="checkbox"
      :disabled="disabled"
      @input="onInput"
    >
    <span>
      {{ label }}
    </span>
  </label>
</template>
