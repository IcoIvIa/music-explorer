/**
 * 検索バーコンポーネント
 * * @param {Object} props
 * @param {string} props.query - 現在の入力文字列
 * @param {function} props.handleInputChange - 入力値が変更された時のイベントハンドラ
 * @param {function} props.handleSearch - 検索実行（フォーム送信）時の関数
 * @param {Array} props.suggestions - 表示する検索候補の配列
 * @param {function} props.handleSuggestionClick - 候補をクリックした時の関数
 */
function SearchBar({
    query,
    handleInputChange,
    handleSearch,
    suggestions,
    handleSuggestionClick,}) {

    return (

        <form
        /**
       * フォーム送信時の処理
       * Enterキー押下時やDIGボタンクリック時に実行される
       */
        onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
        }} 
        className='
            relative
            flex
            w-full
            max-w-md
            rounded-2xl
            px-4
            py-2
            gap-2'
        style={{
            background: '#2d1b69',
            boxShadow: 'inset 3px 3px 8px #1a0f3e, inset -3px -3px 8px #3d2882'
            }}>

            {/* 検索バー */ }
            <input
                type="text"
                placeholder="アーティスト名を入力..."
                value={query}
                onChange={handleInputChange}
                // onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="
                    flex-1 
                    bg-transparent
                    outline-none
                    text-sm"
                style={{ color: '#f3e8ff' }}
            />

           {/* サジェストリストの表示条件。候補が存在する場合のみ、絶対配置(absolute)でリストを表示する*/}
            {suggestions.length > 0 && (
                <ul className='
                    absolute
                    top-full
                    left-0
                    mt-2
                    w-full
                    bg-[#2d1b69]
                    border
                    border-[#4c1d95]
                    rounded-xl
                    overflow-hidden
                    shadow-2xl
                    z-50'>

            {suggestions.map((artist, index) => (
                <li
                key={index}
                onClick={() => handleSuggestionClick(artist.name)}
                className='
                    px-4
                    py-3
                    text-sm
                    text-[#f3e8ff]
                    hover:bg-[#4c1d95]
                    cursor-pointer
                    transition-colors
                    border-b
                    border-[#1a0f3e]
                    last:border-none'
                >
                    <div className="font-bold">
                        {artist.name}
                    </div>
                </li>
                    ))}
                </ul>
                
            )}

            {/* DIG(検索)ボタン */}
                <button
                    type="submit" 
                // onClick={handleSearch} 
                className='
                    text-xs
                    font-bold
                    tracking-widest
                    px-5
                    py-2
                    rounded-xl'
                style={{
                    background: '#2d1b69',
                    color: '#f9a8d4',
                    boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882'}}
                    >
                DIG
                </button>
        </form>
    )
}

export default SearchBar