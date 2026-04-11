/**
 * お気に入り一覧を表示するモーダルコンポーネント
 * @param {boolean} isOpen モーダルの開閉状態
 * @param {function} onClose モーダルを閉じる関数
 * @param {array} favorites お気に入りアーティストの配列
 * @param {function} removeFavorite お気に入りから削除する関数
 */

function FavoritesModal({ isOpen, onClose, favorites, removeFavorite, explorationHistory}) {
    if(!isOpen) return null

    return (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.7)'}}
        onClick={onClose}
        >
            {/* モーダル本体 */}
            <div
            className="w-full max-w-md mx-4 rounded-2xl p-6 flex flex-col gap-4"
            style={{
                background: '#2d1b69',
                boxShadow: '8px 8px 20px #1a0f3e, -8px -8px 20px #3d2882',
                maxHeight: '80vh',
                overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
            >

{/* ヘッダー */}
<div className="flex items-center justify-between">
    <p
    className="text-lg font-bold tracking-widest"
    style={{ color: '#f3e8ff'}}
    >
        ★ お気に入り
        </p>
        <button
        onClick={onClose}
        className="text-xs px-3 py-1 rounded-full"
        style={{
            background: '#2d1b69',
            color: 'rgba(243,232,255,0.5)',
            boxShadow: '3px 3px 8px #1a0f3e, -3px -3px 8px #3d2882'
        }}
        >
            閉じる
            </button>
            </div>

            {/* お気に入り一覧 */}

<div className="mt-4">
    <p
    className="text-xs tracking-widest mb-3"
    style={{ color: 'rgba(243,232,255,0.4)' }}
    >
        探索の足跡
    </p>
    {explorationHistory.map((historyArtistName, index) => (
        <div key={index} className="flex item-center gap-2 mb-2">
            <span style={{ color: 'rgba(243,232,255,0.3)'}}>
                {index === 0 ? '🌱' : '└'}
                </span>
                <p
                className="text-sm"
                style={{
                    color: '#f3e8ff',
                    paddingLeft: `${index * 12}px`
                }}
                >
                    {historyArtistName}
                </p>
                </div>
    ))}
</div>
            {favorites.length === 0? (
                <p
                className="text-sm text-center py-8"
                style={{ color: 'rgba(243,232,255,0.3)'}}
                >
                    まだお気に入りがありません
                    </p>
            ):(
                favorites.map((favoriteArtist, index) =>(
                    <div
                    key={index}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{
                        background: '#2d1b69',
                        boxShadow: '3px 3px 8px #1a0f3e, -3px -3px 8px #3d2882'
                                        }}
                                        >
                                            {/* アバター＋名前 */}
                    <div className="flex items-center gap-3">
                        <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                            background: '#2d1b69' ,
                            color: '#f9a8d4' ,
                            boxShadow: 'inset 2px 2px 5px #1a0f3e, inset -2px -2px 5px #3d2882'
                        }}
                        >
                            {favoriteArtist.name.slice(0,2).toUpperCase()}
                            </div>
                            <p
                            className="text-sm font-medium"
                            style={{
                                color: '#f3e8ff'
                            }}
                            >
                                {favoriteArtist.name}
                                </p>
                                </div>

                                {/* 削除ボタン */}
                                <button
                                onClick={() => removeFavorite(favoriteArtist.name)}
                                className="text-xs px-3 py-1 rounded-full"
                                style={{
                                    background: '#2d1b69',
                                    color: 'rgba(243,232,255,0.4)',
                                    boxShadow: '3px 3px 8px #1a0f3e, -3px -3px 8px #3d2882'
                                }}
                                >
                                    削除
                                </button>
                                </div>
                ))

    )}
    </div>
    </div>
    )
}

export default FavoritesModal