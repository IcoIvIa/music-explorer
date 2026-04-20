/**
 * お気に入りアーティストの探索履歴を詳細表示するページ
 */
function HistoryPage() {
const name = new URLSearchParams(window.location.search).get('name') || '不明'
const frozenHistory = JSON.parse(localStorage.getItem('frozenHistory') || '[]')

  return (
    <div className="min-h-screen p-8" style={{ background: '#0d0820', color: '#f3e8ff' }}>
      {/* 戻るボタン */}
      <button
        onClick={() => window.close()} // 一つ前のページ（DigPage）に戻る
        className="mb-8 text-xs tracking-widest px-4 py-2 rounded-full"
        style={{
          background: '#2d1b69',
          color: '#bef264',
          boxShadow: '3px 3px 8px #1a0f3e, -3px -3px 8px #3d2882'
        }}
      >
        ← 探索に戻る
      </button>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#f9a8d4' }}>
          {name}
        </h1>
        <p className="text-sm mb-12" style={{ color: 'rgba(243,232,255,0.5)' }}>
          への探索ルート
        </p>

        {/* 履歴のリスト表示 */}
        <div className="flex flex-col gap-4">
          {(frozenHistory || []).map((artistName, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: '#2d1b69', color: '#bef264' }}
              >
                {index + 1}
              </div>
              <div
                className="flex-1 p-4 rounded-xl"
                style={{
                  background: '#2d1b69',
                  boxShadow: '4px 4px 10px #1a0f3e'
                }}
              >
                <p className="font-medium">{artistName}</p>
              </div>
              {/* 最後の要素以外に矢印を表示 */}
              {index !== frozenHistory.length - 1 && (
                <div className="text-center w-8" style={{ color: 'rgba(243,232,255,0.2)' }}>
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage