import type { Ref } from 'vue'
import { computed } from 'vue'

const COLORS = ['#206AF4', '#F33E3E', '#FFD600', '#64D951', '#6BD0D7', '#F99C12', '#C04FF5']

// 個数に応じてリアクティブに色の配列を返す hooks
// 指定の色をループしながら徐々に薄くなる
export function useColors(size: Ref<number>) {
  const colors = computed(() => {
    if (!size.value) return []

    const value = getColors(size.value)

    return value
  })

  return {
    colors,
  }
}

function hexToRGBA(hex: string, alpha: number) {
  // HEX to RGBA
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  // RGBA to RGB
  // 背景色が白 = rgb(255, 255, 255) という前提で透過度で重みづけして RGB に変換している。
  const r2 = Math.round((1 - alpha) * 255 + alpha * r)
  const g2 = Math.round((1 - alpha) * 255 + alpha * g)
  const b2 = Math.round((1 - alpha) * 255 + alpha * b)

  return `rgb(${r2},${g2},${b2})`
}

function repeat(arr: unknown[], num: number) {
  return Array(num).fill(arr).flat()
}

// 透明度を計算する。段階的に薄くなるようにする。
function opacity(index: number, length: number, size: number) {
  // 作りたい配列が 20 個、オリジナルの配列が 6 個である場合、
  // opacity は次の 4 段階となる
  // 1, 1 - 1/4, 1 - 2/4, 1 - 3/4
  return 1 - Math.floor(index / length) / (Math.floor(size / length) + 1)
}

// 色の配列を作る
function getColors(size: number) {
  return repeat(COLORS, Math.floor(size / COLORS.length) + 1)
    .slice(0, size) // 配列の長さを呼び出し側が期待する長さである size と同じにする。
    .map((color, index) => hexToRGBA(color, opacity(index, COLORS.length, size)))
}
