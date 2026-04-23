# DIGGER 使い方ガイド
 
---
 
## 基本的な流れ
 
### 1. アーティストを検索する
 
トップページの検索バーに好きなアーティスト名を入力します。
入力しながら候補が表示されるので、一覧から選んでもOKです。
「DIG」ボタンを押すと探索画面に移動します。
 
---
 
### 2. 関連アーティストを眺める
 
探索画面には、検索したアーティストに関連するアーティストが5組カード形式で表示されます。これが「1層目」です。
 
気になるアーティストのカードをクリックすると、右側のパネルにそのアーティストの情報と人気曲が表示されます。
 
---
 
### 3. 曲を聴く
 
右パネルの人気曲一覧から曲名をクリックすると、30秒のプレビューが再生されます。
再生中の曲はヘッダーのプレーヤーで確認・操作できます。
 
---
 
### 4. 掘り下げる（DIG）
 
右パネル下部の「DIG」ボタンを押すと、現在表示中のアーティストに関連するアーティストが新しい層として追加されます。
 
これを繰り返すことで、画面が地層のように積み上がっていきます。
深く掘るほど、普段は出会えないアーティストに辿り着けます。
 
> カードをクリックするだけでは層は追加されません。
> 「このアーティストからさらに掘りたい」と思ったら、右パネルのDIGボタンを押してください。
 
---
 
### 5. お気に入りに追加する
 
気に入ったアーティストが見つかったら、右パネルの「☆ お気に入りに追加」ボタンを押します。
そのときの探索経路（どのアーティストを経由して辿り着いたか）も一緒に保存されます。
 
---
 
### 6. 足跡を振り返る
 
ヘッダーの「★ お気に入り」ボタンを押すとモーダルが開きます。
保存したアーティスト名をクリックすると、そのアーティストに辿り着くまでの経路が別ページで確認できます。
 
```
例）
01  Taylor Swift        ← 検索したアーティスト
  02  Olivia Rodrigo
    03  Billie Eilish
      04  💎Clairo        ← ここでお気に入りに追加した 
```
 
---
 
## 画面構成
 
| エリア | 内容 |
|--------|------|
| ヘッダー | ロゴ・探索中アーティスト名・層数・お気に入りボタン・プレーヤー |
| メインエリア（左） | 層ごとのアーティストカード一覧 |
| 右パネル | 選択中アーティストの情報・人気曲・DIG/お気に入りボタン |
 
---



# DIGGER 関数・コンポーネント従属図
 
## ページ遷移
 
```
HomePage.jsx
│
│ [state]  query, suggestions
│
│ handleInputChange()
│   └── setQuery()
│
│ useEffect([query])          ← デバウンス400ms
│   └── searchArtist()        → Last.fm API
│       └── setSuggestions()
│
│ handleSuggestionClick()
│   └── setQuery() / setSuggestions([])
│
│ handleSearch()
│   └── navigate(`/dig?artist=${query}`)
│
▼
DigPage.jsx
```
 
---
 
## DigPage.jsx（メイン）
 
```
DigPage.jsx
│
│ [state]
│   selectedArtist       選択中のアーティスト
│   layers               掘削層の配列
│   explorationHistory   クリック履歴
│   currentTrack         再生中のトラック
│   isDigging            DIG処理中フラグ
│   lastDigArtist        最後にDIGしたアーティスト名
│   toast                トースト通知メッセージ
│   isFavoritesOpen      モーダル開閉
│   tutorialStep         チュートリアルのステップ番号
│   isTutorialOpen       チュートリアル開閉（localStorage判定）
│
│ [カスタムフック]
│   useFavorites()
│     └── favorites, addFavorite, removeFavorite, isFavorite
│
│ useEffect([artistName])          ← URL変更時
│   ├── setSelectedArtist()
│   ├── setExplorationHistory()
│   ├── getSimilarArtists()        → Last.fm API
│   └── setLayers()               1層目をセット
│
│ handleArtistClick(clickedArtist)
│   ├── setSelectedArtist()
│   └── setExplorationHistory()
│
│ handleNextLayerDig()             ← DetailPanelのDIGボタン
│   ├── getSimilarArtists()        → Last.fm API
│   ├── setLayers([...layers, 新しい層])
│   └── setLastDigArtist()
│
│ useEffect([layers])              ← 層追加時にスクロール
│   └── bottomRef.current?.scrollIntoView()
│
├────────────────────────────────────────────┐
▼                                            ▼
Header.jsx                            DetailPanel.jsx
DigLayer.jsx × n                      FavoritesModal.jsx
                                      TutorialModal.jsx
```
 
---
 
## コンポーネント詳細
 
### Header.jsx
```
Header.jsx
│  props: setIsFavoritesOpen, layers, setSelectedArtist,
│         artistName, currentTrack
│
├── [ロゴクリック] navigate('/')
├── [お気に入りボタン] setIsFavoritesOpen(true)
├── [アーティスト名クリック] setSelectedArtist(formatArtist({name: artistName}))
└── AudioPlayer.jsx
      props: currentTrack
      │
      │ [カスタムフック] useAudio(currentTrack)
      │   audioRef, isPlaying, currentTime,
      │   duration, progress
      │   togglePlay() / seek()
      │
      │ useEffect([currentTrack])
      │   └── audio.src = previewUrl → audio.play()
      └── <input type="range"> シークバー
```
 
### DigLayer.jsx
```
DigLayer.jsx
│  props: layer, onArtistClick, currentDepth, selectedArtist
│
│ getLayerColor(layer.depth)       → layerColor
│ getLayerColor(layer.depth + 1)   → nextLayerColor（波線の色）
│
├── WaveDivider()                  SVG波線（地層区切り）
│     colorBottom = nextLayerColor.bg
│
└── ArtistCard.jsx × 5
      props: artist, layerColor, onArtistClick,
             isSelected(artist.name === selectedArtist?.name)
      │
      └── onClick() → onArtistClick(artist,)
                       ↑ DigPage.jsx の handleArtistClick へ
```
 
### DetailPanel.jsx
```
DetailPanel.jsx
│  props: artist, onAddFavoriteArtist, isFavorite,
│         onTrackSelect, onhandleNextLayerDig,
│         isDigging, lastDigArtist
│
│ [state]  topTracks, fullArtistData, isLoading
│
│ useEffect([artist])
│   └── Promise.all([
│         getTopTracks()    → Last.fm API
│         getArtistInfo()   → Last.fm API
│       ])
│
│ handleTrackClick(trackName)
│   ├── getPreviewUrl()     → iTunes API
│   └── onTrackSelect({ name, artistName, previewUrl })
│         ↑ DigPage.jsx の setCurrentTrack へ
│
├── ArtistInfo.jsx
│     props: artist(fullArtistData || artist)
│
├── TrackList.jsx
│     props: topTracks, onTrackClick
│     └── onClick → handleTrackClick()
│
├── NeuButton（お気に入り）
│     onClick → onAddFavoriteArtist(artist)
│               ↑ DigPage.jsx → useFavorites.addFavorite()
│
└── NeuButton（DIG）
      onClick → onhandleNextLayerDig()
                ↑ DigPage.jsx の handleNextLayerDig()
```
 
### FavoritesModal.jsx
```
FavoritesModal.jsx
│  props: isOpen, onClose, favorites,
│         removeFavorite, explorationHistory
│
├── ExplorationHistory.jsx
│     props: explorationHistory
│
└── FavoriteItem.jsx × n
      props: artist, onArtistClick, onRemove
      │
      │ onArtistClick(artist)
      │   ├── localStorage.setItem('frozenHistory', artist.frozenHistory)
      │   └── window.open('/history-detail?name=...')  → HistoryPage.jsx
      │
      └── onRemove → removeFavorite()
                     ↑ useFavorites.removeFavorite()
```
 
---
 
## カスタムフック・ユーティリティ
 
```
useFavorites.js
│  localStorage('favorites') ← → useState
│
│  addFavorite(artist, history)
│    └── isFavorite()で重複チェック → setFavorites / localStorage保存
│
│  removeFavorite(name)
│    └── filter() → setFavorites / localStorage保存
│
│  isFavorite(name)
│    └── some() → boolean
 
formatArtist(artist, index)
│  Last.fm APIのデータ → { id, name, genre, image }
 
getLayerColor(depth)
│  depth(1〜20) → { bg, shadow1, shadow2, textColor, textColorMuted }
│  深さに応じてRGBを補間計算
```
 
---
 
## API通信関連
 
```
Last.fm API（src/services/lastfm.js）
├── searchArtist()       HomePage: サジェスト表示
├── getSimilarArtists()  DigPage:  層の追加
├── getTopTracks()       DetailPanel: 人気曲表示
└── getArtistInfo()      DetailPanel: アーティスト情報表示
 
iTunes API（src/services/itunes.js）
└── getPreviewUrl()      DetailPanel: 30秒プレビューURL取得
```