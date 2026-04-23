import { useNavigate } from "react-router-dom"

/**
 * モーダル内に探索履歴をツリー形式で表示するサブコンポーネント
 * @param {array} explorationHistory クリックしたアーティスト名の履歴配列
 */
function ExplorationHistory({ explorationHistory }) {
    return (
        <div className="mt-4">
            <p className="text-xs tracking-widest mb-3 text-[rgba(243,232,255,0.4)]">探索の足跡</p>

            {explorationHistory.map((historyArtistName, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 mb-2"
                >
                    <span className="text-[rgba(243,232,255,0.3)]">{index === 0 ? '⛏️' : '└'}</span>
                    <p
                        className="text-sm text-[#f3e8ff]"
                        style={{ paddingLeft: `${index * 12}px` }}
                    >
                        {historyArtistName}
                    </p>
                </div>
            ))}
        </div>
    )
}

/**
 * お気に入りアーティスト1件を表示するサブコンポーネント
 * @param {object} artist お気に入りアーティストのオブジェクト（name, frozenHistory）
 * @param {function} onArtistClick アーティストをクリックしたときの処理
 * @param {function} onRemove お気に入りから削除する関数
 */
function FavoriteItem({ artist, onArtistClick, onRemove }) {
    return (
        <div
            onClick={() => onArtistClick(artist)}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface shadow-neu-sm cursor-pointer"
        >
            {/* アバター */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 bg-surface shadow-neu-inset-sm text-[#f9a8d4]">

                    {/*  アーティスト名のイニシャルを表示*/}
                    {artist.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-[#f3e8ff]">{artist.name}</p>
            </div>

            {/* 削除ボタン */}
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onRemove(artist.name)
                }}
                className="text-xs px-3 py-1 rounded-full bg-surface shadow-neu-sm text-[rgba(243,232,255,0.4)]"
            >
                削除
            </button>
        </div>
    )
}


/**
 * DigPage.jsxヘッダーお気に入りをクリックすると、お気に入り一覧を表示するメインモーダルコンポーネント
 * @param {boolean} isOpen モーダルの開閉状態
 * @param {function} onClose モーダルを閉じる関数
 * @param {array} favorites お気に入りアーティストの配列
 * @param {function} removeFavorite お気に入りから削除する関数
 * @param {array} explorationHistory クリックしたアーティスト名の履歴配列
 */
function FavoritesModal({ isOpen, onClose, favorites, removeFavorite, explorationHistory }) {
    const navigate = useNavigate()
    // モーダルが閉じている場合は何もレンダリングしない
    if (!isOpen) return null

    /**
     * お気に入りアーティストをクリックしたときの処理
     * 詳細ページに遷移してモーダルを閉じる
     * @param {object} artist クリックされたアーティスト（name, frozenHistory）
     */
    const handleArtistClick = (artist) => {
        localStorage.setItem('frozenHistory',JSON.stringify(artist.frozenHistory))
        window.open(`/history-detail?name=${encodeURIComponent(artist.name)}`, '_blank')
        onClose()
    }


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={onClose}
        >
            {/* ↑モーダル外側　↓モーダル本体 */}
            <div
                className="w-full max-w-md mx-4 rounded-2xl p-6 flex flex-col gap-4 bg-surface shadow-neu-lg overflow-y-auto"
                style={{ maxHeight: '80vh' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* ヘッダー */}
                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold tracking-widest text-[#f3e8ff]">★ お気に入り</p>
                    <button
                        onClick={onClose}
                        className="text-xs px-3 py-1 rounded-full bg-surface shadow-neu-sm text-[rgba(243,232,255,0.5)]"
                    >
                        閉じる
                    </button>
                </div>

                {/* 探索の足跡 */}
                <ExplorationHistory explorationHistory={explorationHistory} />

                {/* お気に入り一覧 */}
                {favorites.length === 0 ? (
                    <p className="text-sm text-center py-8 text-[rgba(243,232,255,0.3)]">
                        まだお気に入りがありません
                    </p>
                ) : (
                    favorites.map((artist, index) => (
                        <FavoriteItem
                            key={index}
                            artist={artist}
                            onArtistClick={handleArtistClick}
                            onRemove={removeFavorite}
                        />
                    ))
                )}

                <p className="text-xs tracking-widest text-[#f9a8d4]">
                    アーティスト名をクリックすると、そのアーティストにたどり着いた足跡を確認することができます。
                </p>
            </div>
        </div>
    )
}

export default FavoritesModal