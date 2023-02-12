<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const prefectures = ref<any>()
const nature = ref<any>()

onMounted(async () => {
  prefectures.value = await (await fetch('/api/prefectures')).json()
  nature.value = await (await fetch('/api/population/nature?cityCode=11362&ageTo=-&prefCode=11&ageFrom=30')).json()
})
</script>

<template>
  {{ prefectures }}
  {{ nature }}
</template>
