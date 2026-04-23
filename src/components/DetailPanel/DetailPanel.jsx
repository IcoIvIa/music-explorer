import { useState, useEffect } from 'react'
import { getTopTracks, getArtistInfo } from '../../services/lastfm'
import { getPreviewUrl } from '../../services/itunes'
import ArtistInfo from './ArtistInfo'
import TrackList from './TrackList'
import NeuButton from '../../utils/NeuButton'

/**
 * 選択中のアーティストの詳細情報を表示するコンポーネント
 *
 * @param {object} artist アーティストオブジェクト
 * @param {function} onAddFavoriteArtist お気に入りに追加する処理
 * @param {function} isFavorite お気に入り登録済みか判定する関数
 * @param {function} onTrackSelect 曲選択時の処理（AudioPlayer に渡す）
 * @param {function} onhandleNextLayerDig 次のレイヤーへ掘る処理
 * @param {boolean} isDigging 掘り中かどうか
 * @param {string} lastDigArtist 最後に掘ったアーティスト名
 */
function DetailPanel({
  artist,
  onAddFavoriteArtist,
  isFavorite,
  onTrackSelect,
  onhandleNextLayerDig,
  isDigging,
  lastDigArtist
}) {
  const [topTracks, setTopTracks] = useState([])
  const [fullArtistData, setFullArtistData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * 曲がクリックされたときにプレビューURLを取得して親へ渡す関数
   *
   * @param {string} trackName クリックされた曲名
   * 
   * 1. iTunes API からプレビューURLを取得
   * 2. 曲名・アーティスト名・プレビューURLを onTrackSelect に渡す
   * 3. 親コンポーネント（DigPage）で AudioPlayer に反映される
   */
  async function handleTrackClick(trackName) {
    const previewUrl = await getPreviewUrl(trackName, artist.name)
    onTrackSelect({
      name: trackName,
      artistName: artist.name,
      previewUrl
    })
  }

  /**
   * 選択中のアーティストが変わったときに
   * Last.fm API から人気曲とアーティスト情報を取得する処理
   *
   * @effect
   * @param {object} artist 選択中のアーティストオブジェクト
   * 
   * 1. fullArtistData を一旦 null にして「読み込み中」状態にする
   * 2. getTopTracks と getArtistInfo を並列で取得
   * 3. 結果を state に保存して画面を更新
   */
  useEffect(() => {
    if (!artist) return

    async function loadArtistData() {
      setIsLoading(true)
      setFullArtistData(null) // 読み込み中の状態にする

      const [tracks, info] = await Promise.all([
        getTopTracks(artist.name),
        getArtistInfo(artist.name)
      ])

      setTopTracks(tracks)
      setFullArtistData(info)
      setIsLoading(false)
    }

    loadArtistData()
  }, [artist])

  if (!artist) return null


  // 派生値（UI 表示のための計算）

  const noTracks = topTracks.length === 0
  const alreadyDug = lastDigArtist === artist.name

  const digLabel = alreadyDug
    ? 'already dug'
    : isDigging
      ? 'digging...'
      : 'dig'

  const favVariant = isFavorite(artist.name) ? 'yellow' : 'primary'
  const favLabel = isFavorite(artist.name)
    ? '★ お気に入り済み'
    : '☆ お気に入りに追加'


  // JSX

  return (
    <div className="flex flex-col gap-4 p-6 rounded-2xl h-full bg-surface shadow-neu min-w-0 overflow-hidden"
    
    >

      {/* アーティスト情報 */}
      <div className="min-w-0">
      <ArtistInfo artist={fullArtistData || artist} />
      </div>
      {/* 人気曲一覧 */}
      {isLoading
        ? <p className="text-xs text-[rgba(243,232,255,0.3)]">読み込み中...</p>
        : <TrackList topTracks={topTracks} onTrackClick={handleTrackClick} />
      }

      {/* お気に入りボタン */}
      <NeuButton
        variant={favVariant}
        isDisabled={noTracks}
        onClick={() => !noTracks && onAddFavoriteArtist(artist)}
        className="mt-auto"
      >
        {favLabel}
      </NeuButton>

      {/* DIG ボタン */}
      <NeuButton
        isDisabled={isDigging || alreadyDug}
        onClick={onhandleNextLayerDig}
      >
        {digLabel}
      </NeuButton>
    </div>
  )
}

export default DetailPanel
