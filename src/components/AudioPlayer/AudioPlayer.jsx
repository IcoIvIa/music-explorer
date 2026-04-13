import { useState, useRef, useEffect } from 'react'

/**
 * 曲のプレビューを再生するコンポーネント
 * @param {object} currentTrack 再生中の曲情報（name, artistName, previewUrl）
 */

function AudioPlayer({ currentTrack,}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)


  useEffect(() => {
    if (currentTrack?.previewUrl) {
      audioRef.current.src = currentTrack.previewUrl
      audioRef.current.play()
      setIsPlaying(true)
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
    setDuration(audioRef.current.duration)
  }

  function formatTime(seconds) {
    if (!seconds) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div
      className="px-6 py-3 flex items-center gap-4 z-40"
      style={{
        background: '#2d1b69',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.4)'
      }}
    >
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* 再生・停止ボタン */}
      <button
        onClick={handlePlayPause}
        disabled={!currentTrack}
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{
          background: '#2d1b69',
          boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882'
        }}
      >
        <span
          style={{ color: '#f9a8d4', fontSize: '16px' }}>
          {isPlaying ? '\u23F8\uFE0E' : '\u25B6\uFE0E'}
        </span>
      </button>

      {/* 曲情報 */}
      <div className="min-w-[200px] max-w-[200px]">
        {currentTrack ? (
          <>
            <p className="text-sm font-medium truncate " style={{ color: '#f3e8ff' }}>
              {currentTrack?.name}
            </p>

            <p className="text-xs truncate" style={{ color: 'rgba(243,232,255,0.4)' }}>
              {currentTrack?.artistName}
            </p>
          </>
        ) : (
          <p className='text-xs'
          style={{ color: 'rgba(243,232,255,0.3)' }}>
            曲を選んでください
          </p>

        )}
      </div>


      {/* プログレスバー */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs"
          style={{
            color: 'rgba(243,232,255,0.4)',
            width: '35px',
            fontFamily: 'monospace',
            fontVariantNumeric: 'tabular-nums'
          }}>
          {formatTime(currentTime)}
        </span>
        <div
          className="w-24 h-1 rounded-full overflow-hidden"
          style={{ background: 'rgba(243,232,255,0.1)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              background: '#a78bfa'
            }}
          />
        </div>
        <span className="text-xs"
          style={{
            color: 'rgba(243,232,255,0.4)',
            width: '35px',
            fontFamily: 'monospace',
            fontVariantNumeric: 'tabular-nums'
          }}>
          {formatTime(duration)}
        </span>
      </div>

      {/* 閉じるボタン 最終的に不要なら削除*/}
      {/* <button
        onClick={onClose}
        className="text-xs px-3 py-1 rounded-full flex-shrink-0"
        style={{
          background: '#2d1b69',
          color: 'rgba(243,232,255,0.4)',
          boxShadow: '3px 3px 8px #1a0f3e, -3px -3px 8px #3d2882'
        }}
      >
        ✕
      </button> */}
    </div>
  )
}

export default AudioPlayer