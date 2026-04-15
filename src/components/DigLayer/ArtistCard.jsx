/**
 * アーティストカード1枚を表示するコンポーネント
 * @param {object} artist アーティスト情報
 * @param {object} layerColor 層の色テーマ
 * @param {function} onArtistClick カードクリック時の処理
 * @param {Boolean}isDeepest　DigLayer.jsxから受け取る値。DigPage.jsxに渡すための中継地点
 */

function ArtistCard({ artist, layerColor, onArtistClick ,isDeepest}) {
    return (
        <button
        onClick={() => onArtistClick(artist, isDeepest)}
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
                {artist.name.slice(0,2).toUpperCase()}
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
  )
}

export default ArtistCard