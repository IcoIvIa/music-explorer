import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const dummyArtists = [
  { id: 1, name: 'Olivia Rodrigo', genre: 'Pop' },
  { id: 2, name: 'Billie Eilish', genre: 'Alt Pop' },
  { id: 3, name: 'Ariana Grande', genre: 'Pop / R&B' },
]

/**
 * 層が深くなるほど背景が濃くなるように色を計算する関数
 * @param {DigPage から渡される階層番号。1層目、2層目…のように扱う。} depth 
 * depthはfunction DigPageで分割代入した値、階層のよう扱う
 * maxDepth = は最深部の色。色が変わらないようにする上限値
 * progress = 色の計算に使うためdepthを0から1以下の数字に変換。
 * if (progress < 0.5) 前半：浅い紫 → 明るい紫
 * else 後半：明るい紫 → 深い藍紫
 * const bg 以下　影の生成
 * @returns 
 * bg: "rgb(...)",背景色
 * shadow1: "rgb(...)",暗い影
 * shadow2: "rgb(...)" 明るい影
 */
function getTheme(depth) {
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
    r = Math.round(192 - (192 - 6)  * t)
    g = Math.round(132 - (132 - 3)  * t)
    b = Math.round(252 - (252 - 24) * t)
  }
  const bg = `rgb(${r},${g},${b})`
  const shadowDark  = `rgb(${Math.max(r-25,0)},${Math.max(g-20,0)},${Math.max(b-35,0)})`
  const shadowLight = `rgb(${Math.min(r+25,255)},${Math.min(g+20,255)},${Math.min(b+35,255)})`

  return { bg, shadow1: shadowDark, shadow2: shadowLight }
}

/**
 *  背景の飾りつけの用。svgの波線を生成して層ごと区切ることで地層みたいにする
 * @param {*} param0 
 
 * <svg　viewBox***  描画領域等を設定
 * <path d=**** 上部に波線、下部に直線をつくりその間を塗りつぶす。
 * @returns 
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

function DigPage() {
  const [searchParams] = useSearchParams()
  const artistName = searchParams.get('artist')
  const [layers, setLayers] = useState([
    { depth: 1, artists: dummyArtists }
  ])


/**
 * アーティストカードがクリックされたときの処理
 * @param {*} clickedArtist 
 * 現在のlayersに次の階層（depth: layers.length + 1）のアーティスト情報を追加
 */
  function handleArtistClick(clickedArtist) {
    setLayers([
      ...layers,
      { depth: layers.length + 1, artists: dummyArtists }
    ])
  }

  return (
    <div style={{ background: '#0d0820' }}>

      {/* ヘッダー */}
      <div
        className="px-6 pt-10 pb-6"
        style={{ background: '#5b21b6' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1
            className="text-2xl font-bold tracking-widest"
            style={{ color: '#f3e8ff', textShadow: '0 0 20px rgba(243,232,255,0.3)' }}
          >
            DIG<span style={{ color: '#f9a8d4' }}>GER</span>
          </h1>
          <div
            className="text-xs tracking-widest px-4 py-2 rounded-full"
            style={{
              background: '#4c1d95',
              color: '#bef264',
              boxShadow: '3px 3px 8px #4c1d95, -3px -3px 8px #6d28d9'
            }}
          >
            {layers.length}層目を掘削中
          </div>
        </div>
        <p className="text-xs tracking-widest"
          style={{ color: 'rgba(243,232,255,0.5)' }}
        >
          {artistName}を探索中
        </p>
      </div>

      {/* 層の一覧 */}
      {layers.map((layer, index) => {
        const theme = getTheme(layer.depth)
        const nextTheme = getTheme(layer.depth + 1)

        return (
          <div key={layer.depth}>

            {/* 層のコンテンツ */}
            <div
              className="px-6 py-8"
              style={{ background: theme.bg }}
            >
              {/* 層ラベル */}
              <p
                className="text-xs tracking-widest mb-4"
                style={{ color: 'rgba(243,232,255,0.4)' }}
              >
                {layer.depth}層目
              </p>

              {/* アーティストカード */}
              <div className="flex gap-3 flex-wrap">
                {layer.artists.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => handleArtistClick(artist)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all"
                    style={{
                      background: theme.bg,
                      minWidth: '160px',
                      boxShadow: `4px 4px 10px ${theme.shadow1}, -4px -4px 10px ${theme.shadow2}`
                    }}
                  >
                    {/* アバター */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: theme.bg,
                        color: '#f9a8d4',
                        boxShadow: `inset 2px 2px 5px ${theme.shadow1}, inset -2px -2px 5px ${theme.shadow2}`
                      }}
                    >
                      {artist.name.slice(0, 2).toUpperCase()}
                    </div>

                    {/* アーティスト情報 */}
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#f3e8ff' }}>
                        {artist.name}
                      </p>
                      <p className="text-xs" style={{ color: 'rgba(243,232,255,0.4)' }}>
                        {artist.genre}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 波形の区切り */}
            <div style={{ background: theme.bg }}>
              <WaveDivider
                colorTop={theme.bg}
                colorBottom={nextTheme.bg}
              />
            </div>

          </div>
        )
      })}

      {/* 最下部 */}
      <div className="px-6 py-12 text-center"
        style={{ background: '#0d0820' }}
      >
        <p className="text-xs tracking-widest"
          style={{ color: 'rgba(243,232,255,0.2)' }}
        >
          さらに深く掘り下げよう
        </p>
      </div>

    </div>
  )
}

export default DigPage