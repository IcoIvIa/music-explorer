import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchArtist } from '../services/lastfm'
import SearchBar from '../components/SearchBar/SearchBar.jsx'
import useHomeKeyboard from '../hooks/useHomeKeyboard'

/**
 * 検索ページコンポーネント
 * 検索サジェスト機能（デバウンス付き）と結果ページへの遷移を管理
 */
function HomePage() {
  //状態管理 
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()
  // 定数 検索候補を表示する最大数
  const maxSuggestionNum = 5

  async function handleSearch() {
     if (query.trim() === '') return
     navigate(`/dig?artist=${query}`)
   }
 
   const { highlightIndex, handleKeyDown, resetConfirmed } = useHomeKeyboard({
     query,
     setQuery,
     suggestions,
     setSuggestions,
     handleSearch,
   })
 
   const handleInputChange = (e) => {
     setQuery(e.target.value)
     resetConfirmed() // 入力が変わったら確定状態をリセット
   }
 
   const handleSuggestionClick = (artistName) => {
     setQuery(artistName)
     setSuggestions([])
   }
 
   // デバウンス付きサジェスト取得
   useEffect(() => {
     if (query.trim().length < 1) {
       return setSuggestions([])
     }
     const timer = setTimeout(async () => {
       const results = await searchArtist(query)
       setSuggestions(results.slice(0, maxSuggestionNum))
     }, 400)
     return () => clearTimeout(timer)
   }, [query])
  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center px-6'
      style={{
        background:
          'linear-gradient(180deg, #a78bfa 0%, #7c3aed 25%, #4c1d95 50%, #2d1b69 70%, #0d0820 100%)'
      }}
    >

      {/* ロゴ・タグライン*/}
      <h1
        className="text-5xl font-bold tracking-widest mb-2"
        style={{
          color: '#f3e8ff',
          textShadow: '0 0 30px rgba(243,232,255,0.4)'
        }}>

        DIG
        <span style={{ color: '#f9a8d4' }}>
          GER
        </span>
      </h1>

      <p
        className="text-xs tracking-widest mb-12"
        style={{ color: 'rgba(243,232,255,0.5)' }}>

        新たなアーティストを掘り当てよう
      </p>

      <SearchBar
        query={query}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        highlightIndex={highlightIndex}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default HomePage