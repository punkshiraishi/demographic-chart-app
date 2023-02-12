import type { PopulationDataResponse } from '@/types/population'
import type { PrefecturesResponse } from '@/types/prefecture'

export function useApi() {
  async function getPrefectures() {
    return (await (await fetch('/api/prefectures')).json() as PrefecturesResponse).result
  }

  async function getPoplation(prefCode: number) {
    return (await (await fetch(
      `/api/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    )).json() as PopulationDataResponse)
      .result.data.find(item => item.label === '総人口')?.data ?? []
  }

  return {
    getPrefectures,
    getPoplation,
  }
}
