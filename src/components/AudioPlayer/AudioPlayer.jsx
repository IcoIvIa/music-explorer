import { useState, useRef, useEffect, useMemo } from 'react'

/**
 * オーディオの再生・進捗管理を行うカスタムフック
 * @param {Object} currentTrack - 現在のトラック情報
 */
function useAudio(currentTrack) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  // トラック変更時のリセット処理
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

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime)
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration)
  const handleEnded = () => setIsPlaying(false)
  
  const seek = (time) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const progress = useMemo(() => 
    duration ? (currentTime / duration) * 100 : 0
  , [currentTime, duration])

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    seek
  }
}

/**
 * オーディオプレーヤーコンポーネント
 * @param {Object} props
 * @param {Object} props.currentTrack - トラック情報 (name, artistName, previewUrl)
 */
function AudioPlayer({ currentTrack }) {
  const {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
    seek
  } = useAudio(currentTrack)

  /**
   * 秒数を 0:00 形式にフォーマット
   */
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-3">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* 再生/一時停止ボタン */}
      <button
        onClick={togglePlay}
        disabled={!currentTrack}
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-90 bg-[#4c1d95] text-[#f9a8d4] shadow-neu-header disabled:opacity-30 hover:brightness-110"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? '\u23F8\uFE0E' : '\u25B6\uFE0E'}
      </button>

      {/* 情報とコントロール */}
      <div className="flex flex-col gap-1 w-[160px] min-w-0 h-[52px] justify-center">
        <div className="truncate text-[rgba(243,232,255,0.6)] text-xs font-medium">
          {currentTrack?.name || '曲を選んでください'}
        </div>
        
        {currentTrack && (
          <div className="truncate text-[rgba(243,232,255,0.4)] text-[10px]">
            {currentTrack.artistName}
          </div>
        )}

        {/* シークバーエリア */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[9px] text-[rgba(243,232,255,0.4)] tabular-nums w-5">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex-1 h-1 flex items-center group">
            {/* 実際の入力を背後に配置（アクセシビリティ用） */}
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="absolute w-full h-4 opacity-0 cursor-pointer z-10"
            />
            {/* デザイン用のバー */}
            <div className="absolute w-full h-0.5 rounded-full bg-[rgba(243,232,255,0.15)] overflow-hidden">
              <div
                className="h-full bg-[#c4b5fd] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* ホバー時にバーを少し太くする演出 */}
            <div className="absolute w-full h-0.5 group-hover:h-1 transition-all pointer-events-none" />
          </div>

          <span className="text-[9px] text-[rgba(243,232,255,0.4)] tabular-nums w-5 text-right">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer