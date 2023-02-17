import type prefecturesSample from './samples/prefectures-sample.json'

export type PrefecturesResponse = typeof prefecturesSample
export type Prefecture = (typeof prefecturesSample)['result'][number]
