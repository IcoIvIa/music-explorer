import { useState, useRef, useEffect } from 'react'
 
function AudioPlayer({ currentTrack }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
 
  useEffect(() => {
    const audio = audioRef.current
    if (currentTrack?.previewUrl) {
      audio.src = currentTrack.previewUrl
      audio.play().catch((e) => console.log("再生ブロック:", e))
      setIsPlaying(true)
    }
    return () => {
      audio.pause()
      setIsPlaying(false)
    }
  }, [currentTrack])
 
  function handlePlayPause() {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }
 
  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime)
    if (!duration || duration === Infinity) {
      setDuration(audioRef.current.duration)
    }
  }
 
  function handleSeek(e) {
    const time = Number(e.target.value)
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }
 
  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }
 
  const progress = duration ? (currentTime / duration) * 100 : 0
 
  return (
    <div className="flex items-center gap-3">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
 
      {/* 再生ボタン */}
      <button
        onClick={handlePlayPause}
        disabled={!currentTrack}
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform active:scale-90 bg-[#4c1d95] text-[#f9a8d4] shadow-neu-header disabled:opacity-30"
      >
        {/* <span className="text-[#f9a8d4] text-sm"> */}
          {isPlaying ? '\u23F8\uFE0E' : '\u25B6\uFE0E'}
        {/* </span> */}
      </button>
 
      {/* 曲名 + プログレスバー */}
      <div className="flex flex-col gap-1 w-[160px] min-w-0 h-[52px] justify-center">
        {/* 曲名 */}
        <p className="text-xs truncate text-[rgba(243,232,255,0.6)]">
          {currentTrack ? currentTrack.name : '曲を選んでください'}
        </p>
        {/* アーティスト名 */}
        {currentTrack && (
          <p className="text-[10px] truncate text-[rgba(243,232,255,0.4)]">
            {currentTrack.artistName}
          </p>
        )}
 
        {/* プログレスバー＋時間 */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[rgba(243,232,255,0.4)] tabular-nums w-6 shrink-0">
            {formatTime(currentTime)}
          </span>
 
          <div className="relative flex-1 h-0.5 flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="absolute w-full h-3 opacity-0 cursor-pointer z-10"
            />
            {/* トラック背景 */}
            <div className="absolute w-full h-full rounded-full bg-[rgba(243,232,255,0.15)]">
              {/* 進捗 */}
              <div
                className="h-full rounded-full bg-[#c4b5fd] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
 
          <span className="text-[10px] text-[rgba(243,232,255,0.4)] tabular-nums w-6 shrink-0 text-right">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}
 
export default AudioPlayer