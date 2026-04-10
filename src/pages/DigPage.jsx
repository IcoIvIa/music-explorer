import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import DetailPanel from '../components/DetailPanel/DetailPanel'
import useFavorites from '../hooks/useFavorites'
import { searchArtist, getSimilarArtists } from '../services/lastfm'

const dummyArtists = [
  { id: 1, name: 'Olivia Rodrigo', genre: 'Pop' },
  { id: 2, name: 'Billie Eilish', genre: 'Alt Pop' },
  { id: 3, name: 'Ariana Grande', genre: 'Pop / R&B' },
]



/**
 * 層が深くなるほど背景が濃くなるように色を計算する関数
 * @param {num} depth DigPage から渡される階層番号。1層目、2層目のように扱う。
 * depthはfunction DigPageで分割代入した値、階層のよう扱う
 * maxDepth = は最深部の色。色が変わらないようにする上限値
 * progress = depthをRGB値に変換する。RGBが扱える値にするため0から1以下の数字に変換。
 * if (progress < 0.5) 前半：浅い紫 → 明るい紫
 * else 後半：明るい紫 → 深い藍紫
 * const bg 以下　影の生成
 * @returns 
 * bg: "rgb(...)",背景色
 * shadow1: "rgb(...)",暗い影
 * shadow2: "rgb(...)" 明るい影
 */
function getlayerColor(depth) {
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
 *  背景の飾りつけ用関数。svgの波線を生成して層ごと区切ることで地層みたいにする
 * @param {*} param0 
 * function getlayerColorがリターンした値({ bg, shadow1: shadowDark, shadow2: shadowLight, textColor, textColorMuted })をconst layerColorに代入。layerColor.bgで背景色をとりだして、colorTop={layerColor.bg} として渡す。
 * const nextlayerColor = getlayerColor(layer.depth + 1)　で取得した値（次の断層の色）をcolorBottom={nextlayerColor.bg}で代入して引数で渡す
 * 
 
 * <svg　viewBox***  描画領域等を設定
 * <path d=**** 上部に波線、下部に直線をつくりその間を塗りつぶす。
 * * <path d=*** 波形のベジェ曲線（C240,60...）で波を描き、
*    L1440,60 L0,60 Z で下部を直線で閉じて塗りつぶす
 * @returns 
 * SVG要素
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
 * 階層追加用コンポーネント
 * @returns 
 */
function DigPage() {
  const [searchParams] = useSearchParams()
  const artistName = searchParams.get('artist')
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [layers, setLayers] = useState([])
  const { addFavorite, isFavorite } = useFavorites()

  useEffect(()=> {
    async function loadFirstLayer() {
      
    setSelectedArtist({
      name: artistName,
      genre: '',
      image: ''
    })

      const artists = await getSimilarArtists(artistName)

          // 検索アーティストを初期表示にセット


// for debug
    console.log('artistName:', artistName) 
    console.log('artists:', artists) 
 // end

      const formattedArtists = artists.map((artist,index) => ({
        id: index,
        name: artist.name,
        genre: '',
        image: artist.image[2]['#text']
      }))
      setLayers([{ depth: 1, artists: formattedArtists }])
    }
    loadFirstLayer()
  },[artistName])


  /**
   * アーティストカードがクリックされたときの処理をする関数
   * setSelectedArtist(clickedArtist) 選択中のアーティストを更新
   * const similarArtists = await getSimilarArtists(clickedArtist.name)  Last.fm APIから関連アーティストを取得
   * const formattedArtists Last.fmから返ってきたデータを.mapで使いやすい配列に変換
   * id: index,        // mapのindex番号をIDとして使う。アーティストの読み込み順番を管理する（depthとは別扱い。depthは背景等の描画で使用する）
   * name: artist.name, // アーティスト名をそのまま使う
   * genre: '',         // Last.fmはジャンルを返さないので空文字（余裕があれば実装）
   * image: artist.image[2]['#text'] // large画像のURLを取り出す
   * @param {object} clickedArtist 
   * 現在のlayersに次の階層（depth: layers.length + 1）のアーティスト情報を追加
   */
async function handleArtistClick(clickedArtist) {
  setSelectedArtist(clickedArtist) // 選択中のアーティストを更新

  const similarArtists = await getSimilarArtists(clickedArtist.name)
  const formattedArtists = similarArtists.map((artist,index) => ({
    id: index,
    name: artist.name,
    genre: '',
    image: artist.image[2]['#text']
  }))

  //動作確認用
  // const similarArtists = await getSimilarArtists(clickedArtist.name)
  // console.log(`関連アーティスト`,similarArtists)

  setLayers([
    ...layers,
    { depth: layers.length + 1, artists: formattedArtists }
  ])
}

  return (

  <div className="flex min-h-screen" style={{ background: '#0d0820' }}>

    {/* 左エリア（探索） */}
    <div className="flex-1 overflow-y-auto">

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
        const layerColor = getlayerColor(layer.depth)
        const nextlayerColor = getlayerColor(layer.depth + 1)

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

              {/* アーティストカード */}
              <div className="flex gap-3 flex-wrap">
                {layer.artists.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => handleArtistClick(artist)}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all"
                    style={{
                      background: layerColor.bg,
                      minWidth: '160px',
                      boxShadow: `4px 4px 10px ${layerColor.shadow1}, -4px -4px 10px ${layerColor.shadow2}`
                    }}
                  >
                    {/* アバター */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: layerColor.bg,
                        color: '#f9a8d4',
                        boxShadow: `inset 2px 2px 5px ${layerColor.shadow1}, inset -2px -2px 5px ${layerColor.shadow2}`
                      }}
                    >
                      {artist.name.slice(0, 2).toUpperCase()}
                    </div>

                    {/* アーティスト情報 */}
                    <div>
                      <p className="text-sm font-medium" style={{ color: layerColor.textColor }}>
                        {artist.name}
                      </p>
                      <p className="text-xs" style={{ color: layerColor.textColorMuted }}>
                        {artist.genre}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 波形の区切り */}
            <div style={{ background: layerColor.bg }}>
              <WaveDivider
                colorTop={layerColor.bg}
                colorBottom={nextlayerColor.bg}
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

    </div>

    {/* 右エリア（詳細パネル） */}
    <div className="w-80 p-6 sticky top-0 h-screen">
      <DetailPanel artist={selectedArtist} 
          onAddFavoriteArtist={addFavorite}
    isFavorite={isFavorite}
    />
    </div>

  </div>

  )}
{/*function DigPage終わり*/}

export default DigPage