import ArtistCard from './ArtistCard'
/**
 *  背景の飾りつけ用関数。svgの波線を生成して層ごと区切ることで地層のようににする
 * @param {string}  colorBottom：const nextlayerColor = getlayerColor(layer.depth + 1)　で取得した値（次の断層の色）をcolorBottom={nextlayerColor.bg}で代入して引数で渡す
 * <svg　viewBox***  描画領域等を設定
 * <path d=**** 上部に波線、下部に直線をつくりその間を塗りつぶす。
 *  <path d=*** 波形のベジェ曲線（C240,60　以下続く）で波を描き、L1440,60 L0,60 Z で下部を直線で閉じて塗りつぶす
 *  @param {string} colorTop：（使っていない、削除の際はDigLayer.jsx の呼び出し側も修正）
 * @returns 
 * SVG要素
 * 
 */
function WaveDivider({ colorTop, colorBottom }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ display: 'block', marginBottom: '-1px' }}
    >
      <path
        d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
        fill={colorBottom}
      />
    </svg>
  )
}

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
function getLayerColor(depth) {
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

/**
 * 1層分のアーティストカード一覧と、上記の関数を利用して波線を表示するコンポーネント
 * @param {object} layer 層の情報（depth, artists）
 * @param {function} onArtistClick アーティストカードクリック時の処理
 * @param {number} currentDepth 最終的にhandleArtistClickで最深層がどうかを判断するために、ここで、現在の層を取得する。isDeepest={layer.depth === currentDepthでブーリン値に変換してArtistCard.jsxに渡す。
 */
 function DigLayer({ layer, onArtistClick ,currentDepth}) {
    const layerColor = getLayerColor(layer.depth)
    const nextLayerColor =getLayerColor(layer.depth + 1)
    
    return (
    <div key={layer.depth}>
      {/* 層のコンテンツ */}
      <div
        className="px-6 py-8"
        style={{ background: layerColor.bg }}
      >
        {/* 層ラベル */}
        <p
          className="text-xs tracking-widest mb-4"
          style={{ color: layerColor.textColorMuted }}
        >
          {layer.depth}層目
        </p>

        {/* アーティストカード一覧 */}
        <div className="flex gap-3 flex-wrap">
          {layer.artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              layerColor={layerColor}
              onArtistClick={onArtistClick}
              isDeepest={layer.depth === currentDepth}
            />
          ))}
        </div>
      </div>

      {/* 波形の区切り */}
      <div style={{ background: layerColor.bg }}>
        <WaveDivider
          colorTop={layerColor.bg}
          colorBottom={nextLayerColor.bg}
        />
      </div>
    </div>
  )
}

export default DigLayer