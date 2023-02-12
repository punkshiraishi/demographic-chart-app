<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import ArrayCheckbox from './components/ArrayCheckbox.vue'
import type { Prefecture, PrefecturesResponse } from './types/prefecture'

const prefectures = ref<Prefecture[]>([])
const selectedPrefectures = ref<Prefecture[]>([])
const nature = ref<any>()

onMounted(async () => {
  prefectures.value = (await (await fetch('/api/prefectures')).json() as PrefecturesResponse).result
  nature.value = await (await fetch('/api/population/nature?cityCode=11362&ageTo=-&prefCode=11&ageFrom=30')).json()
})
</script>

<template>
  <ArrayCheckbox
    v-for="prefecture in prefectures"
    :key="prefecture.prefCode"
    v-model="selectedPrefectures"
    :item="prefecture"
    :label="prefecture.prefName"
  />
  {{ selectedPrefectures }}
</template>
