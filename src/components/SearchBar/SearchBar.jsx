/**
 * 検索バーコンポーネント
 * @param {string}   query                  現在の入力文字列
 * @param {function} handleInputChange      入力値変更時のハンドラ
 * @param {function} handleSearch           検索実行関数
 * @param {array}    suggestions            検索候補の配列
 * @param {function} handleSuggestionClick  候補クリック時の関数
 * @param {number}   highlightIndex         キーボードでハイライト中のindex（-1=未選択）
 * @param {function} onKeyDown              キーダウンイベントハンドラ
 */
function SearchBar({ 
    query, 
    handleInputChange, 
    handleSearch, 
    suggestions, 
    handleSuggestionClick,
    highlightIndex = -1,
    onKeyDown,
 }) {

    return (

        <form
            /**
           * フォーム送信時の処理
           * Enterキー押下時やDIGボタンクリック時に実行される
           */
            onSubmit={(e) => { e.preventDefault(); handleSearch() }}
            className="relative flex w-full max-w-md rounded-2xl px-4 py-2 gap-2 bg-surface shadow-neu-inset"
        >

            {/* 検索バー */}
            <input
                type="text"
                placeholder="アーティスト名を入力..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent outline-none text-sm text-[#f3e8ff]"
                autoComplete="off"
            />

            {/* サジェストリストの表示条件。候補が存在する場合のみ、絶対配置でリストを表示する*/}
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 mt-2 w-full bg-[#2d1b69] border border-[#4c1d95] rounded-xl overflow-hidden shadow-2xl z-50">

                    {suggestions.map((artist, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(artist.name)}
                            className="px-4 py-3 text-sm text-[#f3e8ff] cursor-pointer transition-colors border-b border-[#1a0f3e] last:border-none"
                                          style={{
                // キーボードでハイライト中の行は背景色を変える
                background: index === highlightIndex ? '#4c1d95' : 'transparent',
              }}
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
                className="text-xs font-bold tracking-widest px-5 py-2 rounded-xl bg-surface text-[#f9a8d4] shadow-neu"
            >
                DIG
            </button>
        </form>
    )
}

export default SearchBar