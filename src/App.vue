<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { range } from 'lodash'
import ArrayCheckbox from './components/ArrayCheckbox.vue'
import LineChart from './components/LineChart.vue'
import { useApi } from './hooks/useApi'
import type { Prefecture } from './types/prefecture'
import { usePopulationDataStore } from './hooks/usePopulationDataStore'
import { useColors } from './hooks/useColors'

const { getPrefectures, getPopulation } = useApi()
const loading = ref(false)
const prefectures = ref<Prefecture[]>([])
const selectedPrefectureCode = ref<number[]>([])
const { populationDataState, updatePopulationDataState } = usePopulationDataStore(getPopulation)

onMounted(async () => {
  prefectures.value = await getPrefectures()
})

async function onCheck(prefecture: Prefecture) {
  try {
    loading.value = true
    await updatePopulationDataState(prefecture)
  }

  finally {
    loading.value = false
  }
}

// TODO: API から取得した値で動的にラベルを表示できるとより良い
const years = range(1960, 2046, 5)

const datasets = computed(() => populationDataState.value

  // 表示するデータセットは選択中の都道府県に限定する
  .filter(population => selectedPrefectureCode.value.includes(population.prefecture.prefCode))

  // API から受け取ったデータ型を LineChart が要求する型に変換する
  .map(population => ({
    name: population.prefecture.prefName,
    data: population.data.map(item => item.value),
  })))

const { colors } = useColors(computed(() => prefectures.value.length))

// 都道府県と対応する色をマッピングする
const colorsets = computed(() => {
  const value: { [prefName: string]: string } = {}
  prefectures.value.forEach((prefecture, index) => {
    value[prefecture.prefName] = colors.value[index]
  })
  return value
})
</script>

<template>
  <div class="h-screen md:h-auto flex flex-col">
    <h1
      class="
        px-5 py-2 bg-cyan-600 sticky top-0 z-50 shadow-md
        text-white font-bold text-lx md:text-2xl
      "
    >
      都道府県別人口推移グラフ
    </h1>
    <div class="p-5 min-h-0 flex-grow flex flex-col md:flex-row justify-center items-center gap-3">
      <div class="w-full h-[500px] md:w-1/2 md:h-[500px]">
        <LineChart
          v-if="datasets.length > 0"
          :labels="years"
          :datasets="datasets"
          x-label="年"
          y-label="人口"
          :colorsets="colorsets"
          :loading="loading"
        />
        <div
          v-else
          class="h-full grid place-content-center bg-slate-300 rounded text-slate-800"
        >
          都道府県を選択してください
        </div>
      </div>
      <div
        class="
          flex-grow overflow-auto p-1 w-full md:w-1/2
          grid grid-cols-3 md:grid-cols-4 gap-2
        "
      >
        <ArrayCheckbox
          v-for="(prefecture, index) in prefectures"
          :key="prefecture.prefCode"
          v-model="selectedPrefectureCode"
          :item="prefecture.prefCode"
          :label="prefecture.prefName"
          :disabled="loading"
          :color="colors[index]"
          @check="onCheck(prefecture)"
        />
      </div>
    </div>
  </div>
</template>
