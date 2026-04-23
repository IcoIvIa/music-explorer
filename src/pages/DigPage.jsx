import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getSimilarArtists } from '../services/lastfm'
import useFavorites from '../hooks/useFavorites'
import DigLayer from '../components/DigLayer/DigLayer'
import DetailPanel from '../components/DetailPanel/DetailPanel'
import FavoritesModal from '../components/FavoritesModal/FavoritesModal'
import Header from '../components/DigPageOthers/header'
import { formatArtist } from '../utils/formatArtist'
import TutorialModal from '../components/DigPageOthers/TutorialModal'

/**
 * 音楽探索のメインページ
 * 状態管理とAPI通信を担当する
 */

function DigPage() {
  const [searchParams] = useSearchParams()
  const artistName = searchParams.get('artist')
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [layers, setLayers] = useState([])
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [explorationHistory, setExplorationHistory] = useState([])
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isDigging, setIsDigging] = useState(false)
  const [lastDigArtist, setLastDigArtist] = useState(null)
  const [toast, setToast] = useState('')
  const [tutorialStep, setTutorialStep] = useState(1)
  const [isTutorialOpen, setIsTutorialOpen] = useState(
    () => localStorage.getItem('hasSeenTutorial') === null
  )

  const isFirstRender = useRef(true)
  const bottomRef = useRef(null)

  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  // アーティスト選択
  function handleArtistClick(clickedArtist) {
    setSelectedArtist(clickedArtist)
    setExplorationHistory(prev => [...prev, clickedArtist.name])
  }

  // DIG（次の層を掘る）
  async function handleNextLayerDig() {
    if (!selectedArtist || isDigging) return
    if (lastDigArtist === selectedArtist.name) return

    setIsDigging(true)
    try {
      const similarArtists = await getSimilarArtists(selectedArtist.name)
      const formattedArtists = (similarArtists || []).map((artist, index) =>
        formatArtist(artist, index)
      )
      setLayers(prev => [
        ...prev,
        { depth: prev.length + 1, artists: formattedArtists },
      ])
      setLastDigArtist(selectedArtist.name)
    } catch (error) {
      console.error('handleNextLayerDigエラー：', error)
    } finally {
      setIsDigging(false)
    }
  }

  // お気に入り追加
  function handleAddFavorite(artist) {
    addFavorite(artist, explorationHistory)
    setToast(`★ ${artist.name} をお気に入りに追加しました`)
    setTimeout(() => setToast(''), 1000)
  }

  // 初回ロード：1層目を取得
  useEffect(() => {
    async function loadFirstLayer() {
      setSelectedArtist({ name: artistName, genre: '', image: '' })
      setExplorationHistory([artistName])

      const artists = await getSimilarArtists(artistName)
      const formattedArtists = (artists || []).map((artist, index) =>
        formatArtist(artist, index)
      )
      setLayers([{ depth: 1, artists: formattedArtists }])
    }
    loadFirstLayer()
  }, [artistName])

  // 層が追加されたら最下部へスクロール
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [layers])

  // JSX 
  return (
    <div className="flex min-h-screen" style={{ background: '#0d0820' }}>

      {/* モーダル */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        removeFavorite={removeFavorite}
        explorationHistory={explorationHistory}
      />

      {/* 左エリア（探索） */}
      <div className="flex-1 min-w-0 flex flex-col" style={{ background: '#0d0820' }}>

        {/* ヘッダー */}
        <div className="sticky top-0 z-30" style={{ borderRadius: '0 0 4px 4px' }}>
          <Header
            setIsFavoritesOpen={setIsFavoritesOpen}
            layers={layers}
            setSelectedArtist={setSelectedArtist}
            artistName={artistName}
            currentTrack={currentTrack}
          />
        </div>

        {/* 層の一覧 */}
        {layers.map((layer,) => (
          <DigLayer
            key={layer.depth}
            layer={layer}
            onArtistClick={handleArtistClick}
            currentDepth={layers.length}
            selectedArtist={selectedArtist}
          />
        ))}

        {/* 最下部 */}
        <div
          ref={bottomRef}
          className="px-6 py-12 text-center"
          style={{ background: '#0d0820' }}
        >
          <p
            className="text-xs tracking-widest"
            style={{ color: 'rgba(243,232,255,0.2)' }}
          >
            さらに深く掘り下げよう
          </p>
          
          <TutorialModal
            isOpen={isTutorialOpen}
            onClose={() => setIsTutorialOpen(false)}
            tutorialStep={tutorialStep}
            setTutorialStep={setTutorialStep}
          />
        </div>
      </div>

      {/* 右エリア（詳細パネル） */}
      <div
        className="w-80 p-6 sticky top-0 h-screen rounded-l-xl"
      >
        <DetailPanel
          artist={selectedArtist}
          onAddFavoriteArtist={handleAddFavorite}
          isFavorite={isFavorite}
          onTrackSelect={setCurrentTrack}
          onhandleNextLayerDig={handleNextLayerDig}
          isDigging={isDigging}
          lastDigArtist={lastDigArtist}
        />
      </div>

      {/* トースト通知 */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-xs tracking-widest text-[#f3e8ff] bg-[#4c1d95] z-50">
          {toast}
        </div>
      )}
    </div>
  )
}

export default DigPage
