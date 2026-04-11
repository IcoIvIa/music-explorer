import { useState, useEffect } from 'react'
import { getTopTracks } from '../../services/lastfm'

/**
 * 選択中のアーティストの詳細を表示するコンポーネント
 * @param {object} artist 選択中のアーティストオブジェクト
 * @param {function} onAddFavoriteArtist お気に入りに追加する関数
 * @param {function} isFavorite お気に入りかどうか確認する関数
 */

function DetailPanel({ artist, onAddFavoriteArtist, isFavorite }) {
  const [topTracks, setTopTracks] = useState([])

  useEffect(() => {
    async function loadTopTracks() {
      if (!artist) return
      const tracks = await getTopTracks(artist.name)
//for debug
console.log('tracks:',tracks)
//end
      setTopTracks(tracks)
    }
    loadTopTracks()
  },[artist])

  if (!artist) return null

  return (
    <div
    className="flex flex-col gap-4 p-6 rounded-2xl h-full"
    style={{
      background: '#2d1b69',
      boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882'
    }}
    >
      {/* アーティスト画像（仮） */}
    <div
    className="w-full aspect-square rounded-2xl flex items-center justify-center"
    style={{
      background: '#2d1b69',
      color: '#f9a8d4',
      boxShadow: 'inset 3px 3px 8px #1a0f3e, inset -3px -3px 8px #3d2882'
    }}
    >
      {artist.name.slice(0,2).toUpperCase()}
      </div>

      <div>
        <p
        className='text-lg font-bold tracking-wide'
        style={{ color: '#f3e8ff' }}
        >
          {artist.name}
          </p>
          </div>

          {/* 人気曲一覧 */}
          <div className="flex flex-col gap-2">
            <p
            className="text-xs traking-widest md-1"
            style={{ color: 'rgba(243,232,255,0.4)'}}
            >
              人気曲
            </p>
            {topTracks.length === 0 ? (
              <p className="text-xs" style={{ color: 'rgba(243,232,255,0.3)' }}>
              読み込み中...
              </p>
            ) : (
             topTracks.map((track, index) => (
              <div
              key={index}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background:'#2d1b69',
                  boxShadow: '3px 3px 8px #1a0f3e, -3px -3px 8px #3d2882'
                }}
                >
                  <span
                  className="text-xs"
                  style={{ color: 'rgba(243,232,255,0.3)'}}
                  >
                    {index + 1}
                  </span>
                  <span
                  className="text-sm"
                  style={{ color: '#f3e8ff'}}
                  >
                    {track.name}
                  </span>
                  </div>
              ))
            )}
            </div>

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