
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
  const textColor = depth <= 13 ? '#1a0f2e' : '#f3e8ff'
  const textColorMuted = depth <= 13 ? 'rgba(26,15,46,0.4)' : 'rgba(243,232,255,0.4)'
  return { bg, shadow1: shadowDark, shadow2: shadowLight, textColor, textColorMuted }
}

function HistoryPage() {
  const name = new URLSearchParams(window.location.search).get('name') || '不明'
  const frozenHistory = JSON.parse(localStorage.getItem('frozenHistory') || '[]')

  const base = getLayerColor(1)

  return (
    <div className="min-h-screen p-8" style={{ background: base.bg, color: base.textColor, fontFamily: 'sans-serif' }}>

      {/* 戻るボタン */}
      <button
        onClick={() => window.close()}
        className="mb-12 text-xs tracking-widest px-6 py-3 transition-all active:scale-95"
        style={{
          background: base.bg,
          color: base.textColorMuted,
          boxShadow: `4px 4px 8px ${base.shadow1}, -4px -4px 8px ${base.shadow2}`,
          borderRadius: '4px'
        }}
      >
        もどる
      </button>

      <div className="max-w-xl">

        {/* タイトル */}
        <header className="mb-16 border-l-4 pl-6" style={{ borderColor: base.textColorMuted }}>
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-2" style={{ color: base.textColor }}>
            {name}
          </h1>
          <p className="text-xs tracking-[0.2em]" style={{ color: base.textColorMuted }}>
            EXPLORATION LOG
          </p>
        </header>

        {/* 階段状の履歴リスト */}
        <div className="flex flex-col gap-3">
          {(frozenHistory || []).map((artistName, index) => {
            const color = getLayerColor(index + 1)

            return (
              <div
                key={index}
                className="flex items-stretch"
                style={{
                  marginLeft: `${index * 16}px`,
                  marginRight: `-${index * 16}px`
                }}
              >
                {/* インデックス番号：凹み */}
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

                {/* アーティスト名：浮き上がり */}
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
                  <p className="text-lg font-bold tracking-tight">{artistName}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage