import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getSimilarArtists } from '../services/lastfm'
import useFavorites from '../hooks/useFavorites'
import DigLayer from '../components/DigLayer/DigLayer'
import DetailPanel from '../components/DetailPanel/DetailPanel'
import FavoritesModal from '../components/FavoritesModal/FavoritesModal'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'

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
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [isDigging, setIsDigging] = useState(false)
const [lastDigArtist, setLastDigArtist] = useState(null)

  // 最初の層を読み込む

  /**
   * function loadFirstLayer()
* 検索したアーティストの情報と関連アーティストを取得して初期表示する関数
* 1. setSelectedArtist で検索アーティストを詳細パネルの初期表示にセット
* 2. setExplorationHistory で検索アーティストを探索履歴の起点にセット

* 
* 検索欄を実装すれば、useEffectで再検索可能
   */

  useEffect(() => {

    async function loadFirstLayer() {

      setSelectedArtist({
        name: artistName,
        genre: '',
        image: ''
      })

      // 検索アーティストを履歴の起点にセット
      setExplorationHistory([artistName])

      const artists = await getSimilarArtists(artistName)

      // 検索アーティストを初期表示にセット
     
      const formattedArtists =(artists || []).map((artist, index) => ({
        id: index,
        name: artist.name,
        genre: '',
        image: artist.image?.[2]?.['#text'] || ''
      }))
      setLayers([{ depth: 1, artists: formattedArtists }])
    }
    loadFirstLayer()
  }, [artistName])


  /**
   * アーティストカードがクリックされたときの処理をする関数
   * setSelectedArtist(clickedArtist) 選択中のアーティストを更新
   * const similarArtists = await getSimilarArtists(clickedArtist.name)  Last.fm APIから関連アーティストを取得
   * const formattedArtists Last.fmから返ってきたデータを.mapで使いやすい配列に変換
   * id: index,        mapのindex番号をIDとして使う。アーティストの読み込み順番を管理する（depthとは別扱い。depthは背景等の描画で使用する）
   * name: artist.name, アーティスト名をそのまま使う
   * genre: '',         Last.fmはジャンルを返さないので空文字（余裕があれば実装）
   * image: artist.image[2]['#text'] // large画像のURLを取り出す
   * @param {object} clickedArtist 
   * @param {Boolean} isDeepest クリックした層が最深部がどうか判断。tureで層を追加。
   * 現在のlayersに次の階層（depth: layers.length + 1）のアーティスト情報を追加
   */
  async function handleArtistClick(clickedArtist, isDeepest) {

    //for debug
    console.log(isDeepest);
    //end

    setSelectedArtist(clickedArtist) // 選択中のアーティストを更新

    setExplorationHistory([...explorationHistory, clickedArtist.name])


  }

  /**
   * * 1. getSimilarArtists で関連アーティストをLast.fm APIから取得
* 2. formattedArtists でAPIのデータをDIGGERで使いやすい形に変換
* 3. setLayers で1層目として画面に表示
   * @returns 
   */
    async function handleNextLayerDig() {
//　アーティストが選択されてない場合は処理しない
    if(!selectedArtist || isDigging) return;

    if(lastDigArtist === selectedArtist.name){
      return;
    }
    setIsDigging(true)
    try{

      const similarArtists = await getSimilarArtists(selectedArtist.name)
      const formattedArtists = (similarArtists || []).map((artist, index) => ({
        id: index,
        name: artist.name,
        genre: '',
        image: artist.image[2]['#text']
      }))

      setLayers(
  
        [
        ...layers,
        { depth: layers.length + 1, artists: formattedArtists }
      ])
      setLastDigArtist(selectedArtist.name)
    } catch(error) {
      console.error(`handleNextLayerDigエラー：`,error)
    } finally {
      setIsDigging(false)
    }
}

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
      <div className="flex-1">

        <div style={{ background: '#0d0820' }}>

          {/* ヘッダー */}
          <div
            className="px-6 pt-10 pb-6 sticky top-0 z-30"
            style={{ background: '#5b21b6' }}

          >
            <div className="flex items-center justify-between mb-4">
              <h1
                className="text-2xl font-bold tracking-widest"
                style={{ color: '#f3e8ff', textShadow: '0 0 20px rgba(243,232,255,0.3)' }}
              >
                DIG<span style={{ color: '#f9a8d4' }}>GER</span>
              </h1>
              <div
                className="flex items-center gap-3">



                {/* お気に入りボタン */}
                <button
                  onClick={() => setIsFavoritesOpen(true)}
                  className="text-xs tracking-widest px-4 py-2 rounded-full"
                  style={{
                    background: '#4c1d95',
                    color: '#fde68a',
                    boxShadow: '3px 3px 8px #4c1d95, -3px -3px 8px #6d28d9'
                  }}
                >
                  ★ お気に入り
                </button>
                <div
                  className="text-xs tracking-widest px-4 py-2 rounded-full"
                  style={{
                    background: '#4c1d95',
                    color: '#bef264',
                    boxShadow: '3px 3px 8px #4c1d95, -3px -3px 8px #6d28d9'
                  }}
                >
                  {layers.length}層目を掘削中
                </div>

              </div>
            </div>

            <div className="w-full  h-[50px] flex">
              <p className="text-xs cursor-pointer"
                style={{ color: 'rgba(243,232,255,0.5)' }}
                onClick={() => setSelectedArtist({
                  name: artistName,
                  genre: '',
                  image: '', // ArtistInfo.jsx の slice エラー対策
                })}
              >
                <span className="text-lg font-bold tracking-widest pr-[2px]">{artistName}</span>を探索中
              </p>
              {/* AudioPlayer */}
              <div className='ml-auto'>
                <AudioPlayer
                  currentTrack={currentTrack}
                // onClose={() => setCurrentTrack(null)}
                />
              </div>
            </div>


          </div>



          {/* 層の一覧 */}
          {layers.map((layer) => (
            <DigLayer
              key={layer.depth}
              layer={layer}
              onArtistClick={handleArtistClick}
              currentDepth={layers.length}
            />
          ))}

          {/* 最下部 */}
          <div className="px-6 py-12 text-center"
            style={{ background: '#0d0820' }}
          >
            <p className="text-xs tracking-widest"
              style={{ color: 'rgba(243,232,255,0.2)' }}
            >
              さらに深く掘り下げよう
            </p>
          </div>

        </div>

      </div>

      {/* 右エリア（詳細パネル） */}
      <div className="w-80 p-6 sticky top-0 h-screen">
        <DetailPanel
          artist={selectedArtist}
          onAddFavoriteArtist={addFavorite}
          isFavorite={isFavorite}
          onTrackSelect={setCurrentTrack}
          onhandleNextLayerDig={handleNextLayerDig}
          isDigging={isDigging}
          lastDigArtist={lastDigArtist}
        />
      </div>


    </div>


  )


}
{/*function DigPage終わり*/ }


export default DigPage