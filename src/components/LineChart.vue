<script lang="ts" setup>
import { type PropType, computed, toRefs } from 'vue'
import { Line } from 'vue-chartjs'
import type { ChartOptions } from 'chart.js'
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
   * 横軸のラベル名
   */
  xLabel: {
    type: String,
    default: null,
  },

  /**
   * 縦軸のラベル名
   */
  yLabel: {
    type: String,
    default: null,
  },

  /**
   * ローディング
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * グラフの配色。データセットの系列名をキー、値を色とするオブジェクトを渡す。
   */
  colorsets: {
    type: Object as PropType<{ [name: string]: string }>,
    default: () => {},
  },

  /**
   * アニメーションするかどうか
   */
  animation: {
    type: Boolean,
    default: true,
  },
})

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const { labels, datasets, xLabel, yLabel, colorsets, animation } = toRefs(props)

const chartOptions: ChartOptions<'line'> = {
  maintainAspectRatio: false,
  animation: animation.value ? undefined : false,
  plugins: {
    legend: {
      display: false,
    },
    colors: {
      forceOverride: true,
    },
  },
  scales: {
    x: {
      title: {
        display: !!xLabel.value,
        text: xLabel.value,
      },
    },
    y: {
      title: {
        display: !!yLabel.value,
        text: yLabel.value,
      },
    },
  },
}

const chartData = computed(() => {
  return {
    labels: labels.value,
    datasets: datasets.value.map(dataset => ({
      borderColor: colorsets.value[dataset.name],
      backgroundColor: colorsets.value[dataset.name],
      label: dataset.name,
      data: dataset.data,
      fill: false,
      lineTension: 0,
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
