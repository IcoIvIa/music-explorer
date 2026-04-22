import { getLayerColor } from '../utils/getLayerColor'

/**
 * 履歴リストの各行（アーティスト名）を表示するコンポーネント
 */
function HistoryItem({ artistName, index, totalSteps }) {
  const color = getLayerColor(index + 1)
  const isLast = index === totalSteps - 1
  const indent = index * 16

  return (
    <div
      className="flex items-stretch"
      style={{ marginLeft: `${indent}px`, marginRight: `-${indent}px` }}
    >
      <div
        className="w-12 flex items-center justify-center text-xs font-mono"
        style={{
          background: color.bg,
          color: color.textColorMuted,
          boxShadow: `inset 2px 2px 5px ${color.shadow1}, inset -2px -2px 5px ${color.shadow2}`
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <div
        className="flex-1 p-6 flex items-center"
        style={{
          background: color.bg,
          color: color.textColor,
          boxShadow: `6px 6px 12px ${color.shadow1}, -2px -2px 8px ${color.shadow2}`,
          marginLeft: '8px',
          borderRadius: '2px'
        }}
      >
        <div className="flex items-center text-4xl pr-4">
          {isLast ? '💎' : ''}
        </div>
        <p className="text-lg font-bold tracking-tight">{artistName}</p>
      </div>
    </div>
  )
}

/**
 * 探索履歴ページ：右上に「お気に入りイエロー」のレンズフレアと太陽絵文字を追加
 */
function HistoryPage() {
  const name = new URLSearchParams(window.location.search).get('name') || '不明'
  const frozenHistory = JSON.parse(localStorage.getItem('frozenHistory') || '[]')

  const base = getLayerColor(1)      // 1層目の色（開始）
  const targetColor = getLayerColor(19) // 19層目の色（サザンあたりの色）

  // ☆ お気に入りのカラー（#fde68a）をフレアと太陽の色として採用
  const flareColor = '#fde68a';

  return (
    <div 
      className="min-h-screen p-8 relative overflow-hidden" 
      style={{ 
        /**
         * ハイブリッド背景設定：
         * ベースの「1〜19層グラデーション」の上に、右上の「ほんのりイエローフレア」を重ねる。
         */
        background: `
          radial-gradient(circle at 95% 5%, ${flareColor}26 0%, ${flareColor}00 50%),
          linear-gradient(180deg, ${base.bg} 0%, ${base.bg} 900px, ${targetColor.bg} 1800px)
        `,
        backgroundAttachment: 'scroll, scroll',
        color: base.textColor, 
        fontFamily: 'sans-serif' 
      }}
    >
      {/*太陽演出、光源要素。
         強力なブラーと発光（boxShadow）を与える。
      */}
      <div 
        className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full opacity-30 pointer-events-none"
        style={{
          background: flareColor,
          filter: 'blur(60px)',
          boxShadow: `0 0 100px 20px ${flareColor}`,
        }}
      />

      {/*
         太陽の絵文字配置
         右上に固定し、フレアの中心に。光に溶け込ませるための調整を施す。
      */}
      <div 
        className="absolute top-[20px] right-[20px] text-5xl opacity-80 pointer-events-none"
        style={{
          color: flareColor,
          filter: `drop-shadow(0 0 15px ${flareColor})`,
          textShadow: `0 0 30px ${flareColor}`,
        }}
      >
        ☀︎
      </div>

      {/* 戻るボタン */}
      <button
        onClick={() => window.close()}
        className="mb-12 text-xs tracking-widest px-6 py-3 transition-all active:scale-95 relative z-10" // z-10でコンテンツを最前面に
        style={{
          background: base.bg,
          color: base.textColorMuted,
          boxShadow: `4px 4px 8px ${base.shadow1}, -4px -4px 8px ${base.shadow2}`,
          borderRadius: '4px'
        }}
      >
        もどる
      </button>

      <div className="max-w-xl relative z-10"> {/* z-10でコンテンツを最前面に */}
        <header className="mb-16 border-l-4 pl-6" style={{ borderColor: base.textColorMuted }}>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">
            {name}
          </h1>
          <p className="text-xs tracking-[0.2em]" style={{ color: base.textColorMuted }}>
            探索の記録
          </p>
        </header>

        <div className="flex flex-col gap-3">
          {frozenHistory.map((artistName, index) => (
            <HistoryItem 
              key={`${index}-${artistName}`}
              artistName={artistName}
              index={index}
              totalSteps={frozenHistory.length}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage