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
})

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Colors)

const { labels, datasets } = toRefs(props)

const chartOptions: ChartOptions<'line'> = {
  plugins: {
    legend: {
      display: false,
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
    :data="chartData"
    :options="chartOptions"
  />
</template>
