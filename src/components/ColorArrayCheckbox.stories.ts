import { defineComponent, ref } from 'vue'

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
      array: ref([]),
    }
  },
  template: `
    <ColorArrayCheckbox v-model="array" :item="1" label="北海道" />
    <ColorArrayCheckbox v-model="array" :item="2" label="沖縄" />
    <div class="my-2">{{ array }}</div>
  `,
})
