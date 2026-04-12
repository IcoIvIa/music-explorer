/**
 * 人気曲一覧を表示するコンポーネント
 * @param {array} topTracks 人気曲の配列
 * @param {function} onTrackClick 曲クリック時の処理
 */
function TrackList({ topTracks, onTrackClick }) {
  return (
    <div className="flex flex-col gap-2">
      <p
        className="text-xs tracking-widest mb-1"
        style={{ color: 'rgba(243,232,255,0.4)' }}
      >
        人気曲
      </p>
      {topTracks.length === 0 ? (
        <p className="text-xs" style={{ color: 'rgba(243,232,255,0.3)' }}>
          読み込み中...
        </p>
      ) : (
        topTracks.map((track, index) => (
          <button
            key={index}
            onClick={() => onTrackClick(track.name)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-left"
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
              {track.name}
            </span>
            <span
              className="text-xs ml-auto"
              style={{ color: 'rgba(243,232,255,0.3)' }}
            >
              ▶
            </span>
          </button>
        ))
      )}
    </div>
  )
}

export default TrackList