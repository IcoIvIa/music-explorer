function SearchBar({
    query,
    handleInputChange,
    handleSearch,
    suggestions,
    handleSuggestionClick,}) {

    return (

        <form
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

            {/* サジェストリスト */}
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