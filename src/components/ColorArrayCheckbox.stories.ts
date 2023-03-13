/* eslint-disable vue/one-component-per-file */
import { defineComponent, ref } from 'vue'
import { screen, userEvent } from '@storybook/testing-library'
import ColorArrayCheckbox from './ColorArrayCheckbox.vue'

export default {
  title: 'components/ColorArrayCheckbox',
  component: ColorArrayCheckbox,
}

export const basic = () => defineComponent({
  components: {
    ColorArrayCheckbox,
  },
  setup() {
    return {
      array: ref([1]),
    }
  },
  template: `
    <div class="grid grid-flow-col gap-2 w-[300px]">
      <ColorArrayCheckbox
        v-model="array"
        :item="1"
        label="北海道"
        color="#FFD600"
      />
      <ColorArrayCheckbox
        v-model="array"
        :item="2"
        label="沖縄"
        color="#6BD0D7"
      />
    </div>
    <div class="my-2">{{ array }}</div>
  `,
})

export const disabled = () => defineComponent({
  components: {
    ColorArrayCheckbox,
  },
  setup() {
    return {
      array: ref([1]),
    }
  },
  template: `
    <div class="grid grid-flow-col gap-2 w-[300px]">
      <ColorArrayCheckbox
        v-model="array"
        :item="1"
        :disabled="true"
        label="北海道"
        color="#FFD600"
      />
      <ColorArrayCheckbox
        v-model="array"
        :item="2"
        :disabled="true"
        label="沖縄"
        color="#6BD0D7"
      />
    </div>
    <div class="my-2">{{ array }}</div>
  `,
})

basic.play = async () => {
  // クリックする
  await userEvent.click(await screen.findByText('沖縄'))
  await userEvent.click(await screen.findByText('北海道'))
}
