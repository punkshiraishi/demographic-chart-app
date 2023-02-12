<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { range } from 'lodash'
import ArrayCheckbox from './components/ArrayCheckbox.vue'
import LineChart from './components/LineChart.vue'
import { useApi } from './hooks/useApi'

import type { PopulationNature } from './types/populationNature'
import type { Prefecture } from './types/prefecture'

const prefectures = ref<Prefecture[]>([])
const selectedPrefectureCode = ref<number[]>([])

const { getPrefectures, getPoplationNature } = useApi()

onMounted(async () => {
  prefectures.value = await getPrefectures()
})

const fechedPopulationNatures = ref<{
  prefecture: Prefecture
  data: PopulationNature
}[]>([])

async function onCheck(prefecture: Prefecture) {
  fechedPopulationNatures.value.push({
    prefecture,
    data: await getPoplationNature(prefecture.prefCode),
  })
}

const years = range(1985, 2021, 5)

const datasets = computed(() => fechedPopulationNatures.value
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
  {{ selectedPrefectureCode }}
  {{ datasets }}
</template>
