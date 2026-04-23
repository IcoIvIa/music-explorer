import ArtistCard from './ArtistCard'
import {getLayerColor} from '../../utils/getLayerColor'
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
 * 1層分のアーティストカード一覧と、上記の関数を利用して波線を表示するコンポーネント
 * @param {object} layer 層の情報（depth, artists）
 * @param {function} onArtistClick アーティストカードクリック時の処理
 * @param {number} currentDepth 最終的にhandleArtistClickで最深層がどうかを判断するために、ここで、現在の層を取得する。
 */
 function DigLayer({ layer, onArtistClick ,currentDepth ,selectedArtist}) {
    const layerColor = getLayerColor(layer.depth)
    const nextLayerColor =getLayerColor(layer.depth + 1)
    
    return (
    <div>
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
              isSelected={artist.name === selectedArtist?.name}
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