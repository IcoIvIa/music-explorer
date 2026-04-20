import { formatArtist } from "../../utils/formatArtist"
import AudioPlayer from "../AudioPlayer/AudioPlayer"
import { useNavigate } from "react-router-dom"

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
function Header({ setIsFavoritesOpen, layers, setSelectedArtist, artistName, currentTrack }) {
    const navigate = useNavigate()

    return (



        <div 
            className="px-6 pt-10 pb-6 sticky top-0 z-30 bg-[#5b21b6]"
            
            >
      {/* 2カラムグリッド：左＝ロゴ/アーティスト名、右＝バッジ群/AudioPlayer */}
      <div className="grid grid-cols-[1fr_auto] gap-y-4 items-center">
                {/* 上段左：ロゴ */}
                <h1 onClick={() => navigate('/')}
                    className="text-2xl font-bold tracking-widest text-[#f3e8ff] cursor-pointer" 
                    style={{ textShadow: '0 0 20px rgba(243,232,255,0.3)' }}>
                    DIG<span className="text-[#f9a8d4]">GER</span>
                </h1>
{/* 上段右：バッジ群 */}
                <div className="flex items-center gap-3">

                    {/* お気に入りボタン */}
                    <button
                        onClick={() => setIsFavoritesOpen(true)}
                        className="text-xs tracking-widest px-4 py-2 rounded-full bg-[#4c1d95] text-[#fde68a] shadow-neu-header cursor-pointer"
                    >
                        ★ お気に入り
                    </button>
                    <div className="text-xs tracking-widest px-4 py-2 rounded-full bg-[#4c1d95] text-[#bef264] shadow-neu-header">
                        {layers.length}層目を掘削中


                </div>
            </div>

            {/* 下段：探索中アーティスト名 */}

                <p
          className="text-xs cursor-pointer flex items-center min-w-0 text-[rgba(243,232,255,0.5)] pr-4"
                    onClick={() => setSelectedArtist(formatArtist({ name: artistName }, 0))}
                >
                    {/* アーティスト名：長すぎたら ... にする */}
                    <span className="text-lg font-bold tracking-widest pr-[2px] truncate" title={artistName}>                  {artistName}</span>
                    <span className="shrink-0 ml-1">を探索中</span>
                </p>

                {/* 下段右：AudioPlayer */}

                    <AudioPlayer currentTrack={currentTrack} />

            </div>
        </div>
    )
}

export default Header