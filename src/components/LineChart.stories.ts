/* eslint-disable vue/one-component-per-file */
import { defineComponent, ref } from 'vue'

import LineChart from './LineChart.vue'

export default {
  title: 'components/LineChart',
  component: LineChart,
}

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

export const basic = () => defineComponent({
  components: {
    LineChart,
  },
  setup() {
    return {
      datasets,
      labels,
    }
  },
  template: `
    <div class="h-[500px] w-[600px]">
      <LineChart
        :labels="labels"
        :datasets="datasets"
      />
    </div>
  `,
})

export const loading = () => defineComponent({
  components: {
    LineChart,
  },
  setup() {
    return {
      datasets,
      labels,
    }
  },
  template: `
    <div class="h-[500px] w-[600px]">
      <LineChart
        :labels="labels"
        :datasets="datasets"
        :loading="true"
      />
    </div>
  `,
})

export const labeled = () => defineComponent({
  components: {
    LineChart,
  },
  setup() {
    return {
      datasets,
      labels,
    }
  },
  template: `
    <div class="h-[500px] w-[600px]">
      <LineChart
        :labels="labels"
        :datasets="datasets"
        :x-label="'年'"
        :y-label="'人口'"
      />
    </div>
  `,
})
