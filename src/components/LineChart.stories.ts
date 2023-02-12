import { defineComponent, ref } from 'vue'

import LineChart from './LineChart.vue'

export default {
  title: 'components/LineChart',
  component: LineChart,
}

export const basic = () => defineComponent({
  components: {
    LineChart,
  },
  setup() {
    const datasets = ref([
      {
        name: '北海道',
        data: [5000, 5000, 4000],
      },
      {
        name: '東京',
        data: [6000, 5100, 6100],
      },
      {
        name: '沖縄',
        data: [3000, 5500, 4500],
      },
    ])

    const labels = ref([2000, 2005, 2010])

    return {
      datasets,
      labels,
    }
  },
  template: `
    <LineChart
      :labels="labels"
      :datasets="datasets"
    />
  `,
})
