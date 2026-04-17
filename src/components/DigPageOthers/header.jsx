import AudioPlayer from "../AudioPlayer/AudioPlayer"

/**
 * Headerコンポーネント
 * 掘削中の層数表示、お気に入りモーダルの開閉、AudioPlayerの表示を管理
 * @param {Function} setIsFavoritesOpen - お気に入りモーダルの開閉
 * @param {Array} layers - 現在の掘削層の配列
 * @param {Function} setSelectedArtist - 選択中のアーティストを更新
 * @param {string} artistName - 検索中のアーティスト名
 * @param {object} currentTrack - 現在再生中のトラック情報
 * @returns アーティスト探索画面のヘッダー
 */
function Header({
    setIsFavoritesOpen, 
    layers, 
    setSelectedArtist, 
    artistName, 
    currentTrack}) 
    {

    return (
        <div>

            {/* ヘッダー */}
            <div
                className="
                    px-6 
                    pt-10 
                    pb-6 
                    sticky 
                    top-0 
                    z-30"
                style={{ background: '#5b21b6' }}>

                <div 
                    className="
                        flex 
                        items-center 
                        justify-between 
                        mb-4">
                    <h1
                        className="
                            text-2xl 
                            font-bold 
                            tracking-widest"
                        style={{
                            color: '#f3e8ff',
                            textShadow: '0 0 20px rgba(243,232,255,0.3)' }}>
                        DIG
                        <span style={{ color: '#f9a8d4' }}>
                        GER
                        </span>
                    </h1>

                    <div
                        className="
                            flex 
                            items-center 
                            gap-3">

                        {/* お気に入りボタン */}
                        <button
                            onClick={() => setIsFavoritesOpen(true)}
                            className="
                                text-xs 
                                tracking-widest 
                                px-4 py-2 
                                rounded-full"
                            style={{
                                background: '#4c1d95',
                                color: '#fde68a',
                                boxShadow: '3px 3px 8px #4c1d95, -3px -3px 8px #6d28d9'
                            }}
                        >
                            ★ お気に入り
                        </button>
                        <div
                            className="
                                text-xs 
                                tracking-widest 
                                px-4 
                                py-2 
                                rounded-full"
                            style={{
                                background: '#4c1d95',
                                color: '#bef264',
                                boxShadow: '3px 3px 8px #4c1d95, -3px -3px 8px #6d28d9'
                            }}
                        >
                            {layers.length}層目を掘削中
                        </div>

                    </div>
                </div>

                <div 
                    className="
                        w-full  
                        h-[50px] 
                        flex">
                    <p 
                        className="
                            text-xs 
                            cursor-pointer"
                        style={{
                            color: 'rgba(243,232,255,0.5)' }}
                        onClick={() => setSelectedArtist({
                            name: artistName,
                            genre: '',
                            image: '', // ArtistInfo.jsx の slice エラー対策
                        })}
                    >
                    <span 
                        className="
                            text-lg 
                            font-bold 
                            tracking-widest 
                            pr-[2px]">
                            {artistName}</span>を探索中
                    </p>

                    {/* AudioPlayer */}
                    <div className='ml-auto'>
                        <AudioPlayer
                            currentTrack={currentTrack}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header