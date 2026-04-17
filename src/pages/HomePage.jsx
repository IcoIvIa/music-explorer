import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchArtist } from '../services/lastfm'


/**
 * 検索フォームを管理するコンポーネント
 * @param {string} query 検索中のアーティスト名
 * @param {function} navigate ページ遷移を行うReact Routerのフック
 */

function HomePage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  // 入力時の処理
  const maxSuggestionNum = 5;
  const handleInputChange = async (e) => {
  const value = e.target.value
    setQuery(value)

    if (value.trim().length < 1) {
     return setSuggestions([]);
    }
    const results = await searchArtist(value)
    setSuggestions(results.slice(0, maxSuggestionNum))

  }

  // 候補クリック時の処理
  const handleSuggestionClick = (artistName) => {
    setQuery(artistName)
    setSuggestions([])
  }

  // 検索実行
  async function handleSearch() {
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
      {/* ロゴ・タグライン*/}
      <h1 className="text-5xl font-bold tracking-widest mb-2" style={{ color: '#f3e8ff', textShadow: '0 0 30px rgba(243,232,255,0.4)' }}>
        DIG<span style={{ color: '#f9a8d4' }}>GER</span>
      </h1>
      <p className="text-xs tracking-widest mb-12" style={{ color: 'rgba(243,232,255,0.5)' }}>MUSIC EXPLORATION</p>

      {/* 検索バー */}
      <div className="relative flex w-full max-w-md rounded-2xl px-4 py-2 gap-2" style={{ background: '#2d1b69', boxShadow: 'inset 3px 3px 8px #1a0f3e, inset -3px -3px 8px #3d2882' }}>
        <input
          type="text"
          placeholder="アーティスト名を入力..."
          value={query}
          onChange={handleInputChange} 
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 bg-transparent outline-none text-sm"
          style={{ color: '#f3e8ff' }}
        />

        {/* サジェストリスト */}
        {suggestions.length > 0 && (
          <ul className='absolute top-full left-0 mt-2 w-full bg-[#2d1b69] border border-[#4c1d95] rounded-xl overflow-hidden shadow-2xl z-50'>
            {suggestions.map((artist, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(artist.name)}
                className="px-4 py-3 text-sm text-[#f3e8ff] hover:bg-[#4c1d95] cursor-pointer transition-colors border-b border-[#1a0f3e] last:border-none"
              >
                <div className="font-bold">{artist.name}</div>
              </li>
            ))}
          </ul>
        )}
{/* DIG(検索)ボタン */}
        <button onClick={handleSearch} className="text-xs font-bold tracking-widest px-5 py-2 rounded-xl" style={{ background: '#2d1b69', color: '#f9a8d4', boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882' }}>
          DIG
        </button>
      </div>
    </div>
  )
} 

export default HomePage