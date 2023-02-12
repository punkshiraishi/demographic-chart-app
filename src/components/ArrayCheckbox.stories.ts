import { defineComponent, ref } from 'vue'

import ArrayCheckbox from './ArrayCheckbox.vue'

export default {
  title: 'components/ArrayCheckbox',
  component: ArrayCheckbox,
}

export const basic = () => defineComponent({
  components: {
    ArrayCheckbox,
  },
  setup() {
    return {
      array: ref([]),
    }
  },
  template: `
    <ArrayCheckbox v-model="array" :item="1" label="北海道" />
    <ArrayCheckbox v-model="array" :item="2" label="沖縄" />
    <div class="my-2">{{ array }}</div>
  `,
})
