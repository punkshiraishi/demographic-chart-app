<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { range } from 'lodash'
import ArrayCheckbox from './components/ArrayCheckbox.vue'
import LineChart from './components/LineChart.vue'
import { useApi } from './hooks/useApi'

import type { Prefecture } from './types/prefecture'
import { usePopulationDataStore } from './hooks/usePopulationDataStore'

const prefectures = ref<Prefecture[]>([])
const selectedPrefectureCode = ref<number[]>([])

const { getPrefectures, getPoplationNature } = useApi()

onMounted(async () => {
  prefectures.value = await getPrefectures()
})

const { populationDataState, updatePopulationDataState } = usePopulationDataStore(getPoplationNature)

async function onCheck(prefecture: Prefecture) {
  await updatePopulationDataState(prefecture)
}

const years = range(1985, 2021, 5)

const datasets = computed(() => populationDataState.value
  .filter(population => selectedPrefectureCode.value.includes(population.prefecture.prefCode))
  .map(population => ({
    name: population.prefecture.prefName,
    data: population.data.bar.mandata
      .map((man, index) => man.value + population.data.bar.womandata[index].value),
  })))
</script>

<template>
  <ArrayCheckbox
    v-for="prefecture in prefectures"
    :key="prefecture.prefCode"
    v-model="selectedPrefectureCode"
    :item="prefecture.prefCode"
    :label="prefecture.prefName"
    @check="onCheck(prefecture)"
  />
  <LineChart
    :labels="years"
    :datasets="datasets"
  />
</template>
