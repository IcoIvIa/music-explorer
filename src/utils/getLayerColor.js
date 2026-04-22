/**
 * 
 * 層が深くなるほど背景が濃くなるように色を計算する関数
 * @param {number} depth DigPage から渡される階層番号。1層目、2層目のように扱う。
 * depthはfunction DigPageでから渡される値、階層のよう扱う
 * maxDepth = は最深部の色。色が変わらないようにする上限値
 * progress = depthをRGB値に変換する。progress = depth を 0〜1 の範囲に正規化した値。この値を使って RGB の補間（色の変化）を計算する。
 * if (progress < 0.5) 前半：浅い紫 → 明るい紫
 * else 後半：明るい紫 → 深い藍紫
 * const bg 以下　影の生成
 * @returns 
 * bg: "rgb(...)",背景色
 * shadow1: "rgb(...)",暗い影
 * shadow2: "rgb(...)" 明るい影
 */
export function getLayerColor(depth) {
  const maxDepth = 20
  const progress = Math.min((depth - 1) / maxDepth, 1)

  let r, g, b

  if (progress < 0.5) {
    const t = progress / 0.5
    r = Math.round(236 - (236 - 192) * t)
    g = Math.round(194 - (194 - 132) * t)
    b = Math.round(240 + (240 - 252) * t)
  } else {
    const t = (progress - 0.5) / 0.5
    r = Math.round(192 - (192 - 6) * t)
    g = Math.round(132 - (132 - 3) * t)
    b = Math.round(252 - (252 - 24) * t)
  }

  const bg = `rgb(${r},${g},${b})`
  const shadowDark = `rgb(${Math.max(r - 25, 0)},${Math.max(g - 20, 0)},${Math.max(b - 35, 0)})`
  const shadowLight = `rgb(${Math.min(r + 25, 255)},${Math.min(g + 20, 255)},${Math.min(b + 35, 255)})`

  // 13層目までは黒字、14層目以降は白字。3項演算子で判断
  const textColor = depth <= 13 ? '#1a0f2e' : '#f3e8ff'
  const textColorMuted = depth <= 13 ? 'rgba(26,15,46,0.5)' : 'rgba(243,232,255,0.4)'

  return { bg, shadow1: shadowDark, shadow2: shadowLight, textColor, textColorMuted }
}
