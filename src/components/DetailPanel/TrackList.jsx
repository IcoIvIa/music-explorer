/**
 * 人気曲一覧を表示するコンポーネント
 * @param {array} topTracks 人気曲の配列（lastfm.jsのgetTopTracksから渡される）
 * @param {function} onTrackClick 曲クリック時の処理
 */
function TrackList({ topTracks, onTrackClick }) {
  //  まだデータが届いていないときのメッセージ
  if (topTracks === null) {
    return <p className="text-xs text-[rgba(243,232,255,0.3)]">読み込み中...</p>
  }
  // エラーデータが届いた時のメッセージ（空配列[]）
  if (topTracks.length === 0) {
    return <p className="text-xs text-[rgba(243,232,255,0.3)]">データを取得できませんでした</p>
  }
  // 正常表示
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs tracking-widest mb-1 text-[rgba(243,232,255,0.4)]">人気曲</p>
      {topTracks.map((track, index) => (
        <button
          key={index}
          onClick={() => onTrackClick(track.name)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-left bg-surface shadow-neu-sm"
        >
          <span className="text-xs text-[rgba(243,232,255,0.3)]">{index + 1}</span>
          <span className="text-sm text-[#f3e8ff] truncate"
                title={track.name}>{track.name}</span>
          <span className="text-xs ml-auto text-[rgba(243,232,255,0.3)]">▶</span>
        </button>
      ))
      }
    </div>
  )
}

export default TrackList