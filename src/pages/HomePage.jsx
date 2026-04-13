import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


/**
 * 検索フォームを管理するコンポーネント
 * @param {string} query 検索中のアーティスト名
 * @param {function} navigate ページ遷移を行うReact Routerのフック
 */
function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  
  /**
   * 検索ボタンまたはEnterキーが押されたときの処理
   * query.trim()で空白のみの入力を弾く
   * /dig?artist=検索ワード に遷移してDigPageに検索ワードを渡す
   * @param {string} query 検索中のアーティスト名
   */
  function handleSearch() {
    if (query.trim() === '') return
    navigate(`/dig?artist=${query}`)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{
        background: 'linear-gradient(180deg, #a78bfa 0%, #7c3aed 25%, #4c1d95 50%, #2d1b69 70%, #0d0820 100%)'
      }}
    >
      {/* ロゴ */}
      <h1
        className="text-5xl font-bold tracking-widest mb-2"
        style={{ color: '#f3e8ff', textShadow: '0 0 30px rgba(243,232,255,0.4)' }}
      >
        DIG<span style={{ color: '#f9a8d4' }}>GER</span>
      </h1>

      {/* タグライン */}
      <p className="text-xs tracking-widest mb-12"
        style={{ color: 'rgba(243,232,255,0.5)' }}
      >
        MUSIC EXPLORATION
      </p>

      {/* 検索バー */}
      <div
        className="flex w-full max-w-md rounded-2xl px-4 py-2 gap-2"
        style={{
          background: '#2d1b69',
          boxShadow: 'inset 3px 3px 8px #1a0f3e, inset -3px -3px 8px #3d2882'
        }}
      >
        <input
          type="text"
          placeholder="アーティスト名を入力..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: '#f3e8ff' }}
        />

        {/* DIGボタン */}
        <button
          onClick={handleSearch}
          className="text-xs font-bold tracking-widest px-5 py-2 rounded-xl transition-all"
          style={{
            background: '#2d1b69',
            color: '#f9a8d4',
            boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882'
          }}
        >
          DIG
        </button>
      </div>
    </div>
  )
}

export default HomePage