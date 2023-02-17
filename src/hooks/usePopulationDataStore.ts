import { readonly, ref } from 'vue'
import type { PopulationData } from '@/types/population'
import type { Prefecture } from '@/types/prefecture'

export function usePopulationDataStore(getPoplationNature: (prefCode: number) => Promise<PopulationData>) {
  const populationDataState = ref<
    {
      prefecture: Prefecture
      data: PopulationData
    }[]
  >([])

  async function updatePopulationDataState(prefecture: Prefecture) {
    if (populationDataState.value.find((population) => population.prefecture.prefCode === prefecture.prefCode)) return

    populationDataState.value.push({
      prefecture,
      data: await getPoplationNature(prefecture.prefCode),
    })
  }

  return {
    populationDataState: readonly(populationDataState),
    updatePopulationDataState,
  }
}
