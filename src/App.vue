<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ArrayCheckbox from './components/ArrayCheckbox.vue'
import { useApi } from './hooks/useApi'
import type { PopulationNature } from './types/populationNature'
import type { Prefecture } from './types/prefecture'

const prefectures = ref<Prefecture[]>([])
const selectedPrefectures = ref<Prefecture[]>([])

const { getPrefectures, getPoplationNature } = useApi()

onMounted(async () => {
  prefectures.value = await getPrefectures()
})

const fechedPopulationNature = ref<PopulationNature[]>([])

async function onCheck(prefecture: Prefecture) {
  fechedPopulationNature.value.push(
    await getPoplationNature(prefecture.prefCode),
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
