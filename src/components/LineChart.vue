<script lang="ts" setup>
import { type PropType, computed, toRefs } from 'vue'
import { Line } from 'vue-chartjs'
import { type ChartOptions, Colors } from 'chart.js'
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'

const props = defineProps({

  /**
   * 横軸のデータ
   */
  labels: {
    type: Array as PropType<number[]>,
    required: true,
  },

  /**
   * データセット
   */
  datasets: {
    type: Array as PropType<{ name: string; data: number[] }[]>,
    required: true,
  },

  /**
   * ローディング
   */
  loading: {
    type: Boolean,
    default: false,
  },
})

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Colors)

const { labels, datasets } = toRefs(props)

const chartOptions: ChartOptions<'line'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: {

      // 凡例を click したときにその系列が消える挙動を無効にする
      onClick: () => {},
    },
    colors: {
      forceOverride: true,
    },
  },
}

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: datasets.value.map(dataset => ({
      label: dataset.name,
      data: dataset.data,
    }),
    ),
  }
})
</script>

<template>
  <Line
    class="absolute"
    :data="chartData"
    :options="chartOptions"
  />
  <div
    v-if="loading"
    class="relative h-full bg-slate-300 bg-opacity-50 grid place-content-center"
  >
    <div class="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent" />
  </div>
</template>
