/**
 * アーティストカード1枚を表示するコンポーネント
 * @param {object} artist アーティスト情報
 * @param {object} layerColor 層の色テーマ
 * @param {function} onArtistClick カードクリック時の処理
 * @param {boolean} isSelected    DIGしたアーティストかどうか（凹みシャドウ）
 * @param {boolean} isFocused     矢印キーでカーソルが当たっているか（枠線で表示）
 */

function ArtistCard({ artist, layerColor, onArtistClick , isSelected, isFocused }) {
    return (
        <button
        onClick={() => onArtistClick(artist)}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all min-w-[160px] max-w-[240px] overflow-hidden"
style={{
  background: layerColor.bg,
          // isFocused のときは outline で枠線を表示（isSelected と独立して管理）
        outline: isFocused ? `2px solid ${layerColor.textColor}` : 'none',
        outlineOffset: '2px',
  boxShadow: isSelected
    ? `inset 2px 2px 5px ${layerColor.shadow1}, inset -2px -2px 5px ${layerColor.shadow2}`
    : `4px 4px 10px ${layerColor.shadow1}, -4px -4px 10px ${layerColor.shadow2}`,
}}
        >
            {/* アバター */}
            <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-text-accent"
            style={{
                          background: layerColor.bg,
          boxShadow: `inset 2px 2px 5px ${layerColor.shadow1}, inset -2px -2px 5px ${layerColor.shadow2}`,
            }}
            >
                {artist.name.slice(0, 2).toUpperCase()}
                </div>

                      {/* アーティスト情報 */}
      <div className="min-w-0">
        <p
          className="text-sm font-medium truncate" 
          style={{ color: layerColor.textColor }} 
          title={artist.name}
          >
          {artist.name}
        </p>
        <p className="text-xs truncate" style={{ color: layerColor.textColorMuted }}>
          {artist.genre}
        </p>
      </div>
    </button>
  )
}

export default ArtistCard