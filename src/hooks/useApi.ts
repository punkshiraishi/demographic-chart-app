import type { PopulationDataResponse } from '@/types/populationNature'
import type { PrefecturesResponse } from '@/types/prefecture'

export function useApi() {
  async function getPrefectures() {
    return (await (await fetch('/api/prefectures')).json() as PrefecturesResponse).result
  }

  async function getPoplationNature(prefCode: number) {
    return (await (await fetch(
      `/api/population/nature?ageTo=-&ageFrom=-&cityCode=-&prefCode=${prefCode}`,
    )).json() as PopulationDataResponse).result
  }

  return {
    getPrefectures,
    getPoplationNature,
  }
}
