/* eslint-disable vue/one-component-per-file */
import { computed, defineComponent, ref } from 'vue'
import isChromatic from 'chromatic'

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

const colors = ['#206AF4', '#F33E3E', '#FFD600']

const colorsets = computed(() => {
  const value: { [prefName: string]: string } = {}
  datasets.value.forEach((datasets, index) => {
    value[datasets.name] = colors[index]
  })
  return value
})

export const basic = () => defineComponent({
  components: {
    LineChart,
  },
  setup() {
    return {

      // chromatic でアニメーションさせないことで余計なスナップショット差分を生むのを防ぐ
      animation: !isChromatic(),
      datasets,
      labels,
      colorsets,
    }
  },
  template: `
    <div class="h-[500px] w-[600px]">
      <LineChart
        :labels="labels"
        :datasets="datasets"
        :colorsets="colorsets"
        :animation="animation"
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
      colorsets,
    }
  },
  template: `
    <div class="h-[500px] w-[600px]">
      <LineChart
        :labels="labels"
        :datasets="datasets"
        :colorsets="colorsets"
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
      colorsets,
    }
  },
  template: `
    <div class="h-[500px] w-[600px]">
      <LineChart
        :labels="labels"
        :datasets="datasets"
        :colorsets="colorsets"
        :x-label="'年'"
        :y-label="'人口'"
      />
    </div>
  `,
})
