import { useState, useEffect } from 'react'
import { getTopTracks } from '../../services/lastfm'
import { getPreviewUrl } from '../../services/itunes'
import ArtistInfo from './ArtistInfo'
import TrackList from './TrackList'

/**
 * 選択中のアーティストの詳細を表示するコンポーネント
 * @param {object} artist 選択中のアーティストオブジェクト
 * @param {function} onAddFavoriteArtist お気に入りに追加する関数
 * @param {function} isFavorite お気に入りかどうか確認する関数
 * @param {function} onTrackSelect 曲選択時の処理
 */

function DetailPanel({ artist, onAddFavoriteArtist, isFavorite ,onTrackSelect }) {
  const [topTracks, setTopTracks] = useState([])

  useEffect(() => {
    async function loadTopTracks() {
      if (!artist) return
      const tracks = await getTopTracks(artist.name)
      setTopTracks(tracks)
    }
    loadTopTracks()
  },[artist])

  if (!artist) return null

  async function handleTrackClick(trackName) {
    const previewUrl = await getPreviewUrl(trackName,artist.name)
    onTrackSelect({
            name: trackName,
      artistName: artist.name,
      previewUrl
    })
  }

  return (
    <div
    className="flex flex-col gap-4 p-6 rounded-2xl h-full"
    style={{
      background: '#2d1b69',
      boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882'
    }}
    >
   
   {/* アーティスト情報 */}
   <ArtistInfo artist={artist} />

   {/* 人気曲一覧 */}
   <TrackList
   topTracks={topTracks}
   onTrackClick={handleTrackClick}
   />


             {/* お気に入りボタン */}
             <button
             onClick={() => onAddFavoriteArtist(artist)}
             className="w-full py-3 rounded-xl text-sm font-bold tracking-widest mt-auto"
             style={{
              background: '#2d1b69',
              color: isFavorite(artist.name)? '#fde68a' : '#bef264',
              boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882'
             }}
             >
              {isFavorite(artist.name)?'★ お気に入り済み' : '☆ お気に入りに追加'}
              </button>
              </div>
  )
}

export default DetailPanel