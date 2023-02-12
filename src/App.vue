<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ArrayCheckbox from './components/ArrayCheckbox.vue'
import type { PopulationNature, PopulationNatureResponse } from './types/populationNature'
import type { Prefecture, PrefecturesResponse } from './types/prefecture'

const prefectures = ref<Prefecture[]>([])
const selectedPrefectures = ref<Prefecture[]>([])

onMounted(async () => {
  prefectures.value = (await (await fetch('/api/prefectures')).json() as PrefecturesResponse).result
})

const fechedPopulationNature = ref<PopulationNature[]>([])

async function onCheck(prefecture: Prefecture) {
  fechedPopulationNature.value.push(
    (await (await fetch(`/api/population/nature?ageTo=-&ageFrom=-&cityCode=-&prefCode=${prefecture.prefCode}`)).json() as PopulationNatureResponse).result,
  )
}
</script>

<template>
  <ArrayCheckbox
    v-for="prefecture in prefectures"
    :key="prefecture.prefCode"
    v-model="selectedPrefectures"
    :item="prefecture"
    :label="prefecture.prefName"
    @check="onCheck(prefecture)"
  />
  {{ fechedPopulationNature }}
</template>
