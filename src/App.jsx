import { useState } from "react";

function App() {
  const[query, setQuery] = useState('')

  function handleSearch() {
    console.log('検索',query)
  }

  return (
    <div>
    <h1>Music Explorer</h1>
    <input type="text"
    placeholder="アーティスト名を入力"// ヒント文字を入れる、デザインを見て削除も可
    value={query}
    onChange={(e) => setQuery(e.target.value)}
     />
     <button onClick={handleSearch}>検索</button>
    </div>
  )
}

export default App