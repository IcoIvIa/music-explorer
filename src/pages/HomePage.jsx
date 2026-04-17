import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchArtist } from '../services/lastfm'
import  SearchBar  from '../components/SearchBar/SearchBar.jsx'


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
      className='
        min-h-screen
        flex flex-col
        items-center
        justify-center
        px-6'
      style={{
        background:
          'linear-gradient(180deg, #a78bfa 0%, #7c3aed 25%, #4c1d95 50%, #2d1b69 70%, #0d0820 100%)'
      }}
    >

      {/* ロゴ・タグライン*/}
      <h1 
      className="
        text-5xl 
        font-bold 
        tracking-widest 
        mb-2" 
      style={{ 
        color: '#f3e8ff', 
        textShadow: '0 0 30px rgba(243,232,255,0.4)' }}>
        
        DIG
        <span style={{ color: '#f9a8d4' }}>
        GER
        </span>
      </h1>

      <p 
      className="
        text-xs 
        tracking-widest 
        mb-12" 
      style={{ color: 'rgba(243,232,255,0.5)' }}>
      
      MUSIC EXPLORATION
      </p>

      <SearchBar
        query = {query}
        handleInputChange = {handleInputChange}
        handleSearch = {handleSearch}
        suggestions = {suggestions}
        handleSuggestionClick = {handleSuggestionClick}
      />
    </div>
  )
} 

export default HomePage