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
  //　＊レスポンシブデザイン用
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
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
    setIsBottomSheetOpen(true)
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
        className="hidden md:block w-80 p-6 sticky top-0 h-screen rounded-l-xl"
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

      {/* ★ モバイル用ボトムシート */}
{isBottomSheetOpen && (
  <>
    <div
      className="md:hidden fixed inset-0 z-40 bg-black/50"
      onClick={() => setIsBottomSheetOpen(false)}
    />
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 rounded-t-3xl overflow-y-auto"
      style={{ height: '75vh', background: '#2d1b69', boxShadow: '0 -8px 30px rgba(0,0,0,0.5)' }}
    >
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 rounded-full bg-[rgba(243,232,255,0.3)]" />
      </div>
      <div className="flex justify-end px-4 pb-2">
        <button
          onClick={() => setIsBottomSheetOpen(false)}
          className="text-xs px-3 py-1 pb-2 rounded-full bg-surface shadow-neu-sm text-[rgba(243,232,255,0.5)]"
        >閉じる</button>
      </div>
      <div className="px-4 pb-8">
        <DetailPanel
          artist={selectedArtist}
          onAddFavoriteArtist={artist => {
            addFavorite(artist, explorationHistory)
            setToast(`★ ${artist.name} をお気に入りに追加しました`)
            setTimeout(() => setToast(''), 1000)
            setIsBottomSheetOpen(false)
          }}
          isFavorite={isFavorite}
          onTrackSelect={setCurrentTrack}
          onhandleNextLayerDig={() => {
            handleNextLayerDig()
            setIsBottomSheetOpen(false)
          }}
          isDigging={isDigging}
          lastDigArtist={lastDigArtist}
        />
      </div>
    </div>
  </>
)}

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
