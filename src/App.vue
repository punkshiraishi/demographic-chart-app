<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { range } from 'lodash'
import ArrayCheckbox from './components/ArrayCheckbox.vue'
import LineChart from './components/LineChart.vue'
import { useApi } from './hooks/useApi'
import type { Prefecture } from './types/prefecture'
import { usePopulationDataStore } from './hooks/usePopulationDataStore'

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

const years = range(1985, 2021, 5)

const datasets = computed(() => populationDataState.value

  // 表示するデータセットは選択中の都道府県に限定する
  .filter(population => selectedPrefectureCode.value.includes(population.prefecture.prefCode))

  // API から受け取ったデータ型を LineChart が要求する型に変換する
  .map(population => ({
    name: population.prefecture.prefName,
    data: population.data.map(item => item.value),
  })))
</script>

<template>
  <ArrayCheckbox
    v-for="prefecture in prefectures"
    :key="prefecture.prefCode"
    v-model="selectedPrefectureCode"
    :item="prefecture.prefCode"
    :label="prefecture.prefName"
    :disabled="loading"
    @check="onCheck(prefecture)"
  />
  <LineChart
    :labels="years"
    :datasets="datasets"
  />
</template>
