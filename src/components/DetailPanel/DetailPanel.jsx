function DetailPanel({ artist, onAddFavoriteArtist, isFavorite }) {
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
        className="w-full aspect-square rounded-2xl flex items-center justify-center text-4xl font-bold"
        style={{
          background: '#2d1b69',
          color: '#f9a8d4',
          boxShadow: 'inset 3px 3px 8px #1a0f3e, inset -3px -3px 8px #3d2882'
        }}
      >
        {artist.name.slice(0, 2).toUpperCase()}
      </div>

      {/* アーティスト名 */}
      <div>
        <p
          className="text-lg font-bold tracking-wide"
          style={{ color: '#f3e8ff' }}
        >
          {artist.name}
        </p>
        <p
          className="text-xs tracking-widest mt-1"
          style={{ color: 'rgba(243,232,255,0.4)' }}
        >
          {artist.genre}
        </p>
      </div>

      {/* 人気曲一覧（仮） */}
      <div className="flex flex-col gap-2">
        <p
          className="text-xs tracking-widest mb-1"
          style={{ color: 'rgba(243,232,255,0.4)' }}
        >
          人気曲
        </p>
        {['曲名 1', '曲名 2', '曲名 3', '曲名 4', '曲名 5'].map((track, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: '#2d1b69',
              boxShadow: '3px 3px 8px #1a0f3e, -3px -3px 8px #3d2882'
            }}
          >
            <span
              className="text-xs"
              style={{ color: 'rgba(243,232,255,0.3)' }}
            >
              {index + 1}
            </span>
            <span
              className="text-sm"
              style={{ color: '#f3e8ff' }}
            >
              {track}
            </span>
          </div>
        ))}
      </div>

      {/* お気に入りボタン */}
      <button
        onClick={() => onAddFavoriteArtist(artist)}
        className="w-full py-3 rounded-xl text-sm font-bold tracking-widest mt-auto"
        style={{
          background: '#2d1b69',
          color: isFavorite(artist.name) ? '#fde68a' : '#bef264',
          boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882'
        }}
      >
        {isFavorite(artist.name) ? '★ お気に入り済み' : '☆ お気に入りに追加'}
      </button>
    </div>
  )
}

export default DetailPanel