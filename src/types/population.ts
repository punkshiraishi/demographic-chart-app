import type populationData from './samples/population-sample.json'

export type PopulationDataResponse = typeof populationData
export type PopulationData = (typeof populationData)['result']['data'][number]['data']
