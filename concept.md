##理想の音楽再生アプリを作る。
デザインはニューモーフィズム を取り入れる。参考URLhttps://note.com/hiro_design_n/n/n4d3e3ab00856

YOUTUBEやXなどの、

App
App
├── SearchBar
├── DigLayer          # 縦積みカード
│   └── ArtistCard    # 各カード
├── SidePanel
│   ├── ArtistInfo
│   ├── TrackList
│   └── FavoriteButton  # ★お気に入りボタン
├── AudioPlayer
│
├── /favorites        # お気に入りページ（別ルート）
│   └── FavoriteList
│
└── /charts           # ランキング分析ページ（時間があれば）
    ├── CountrySelector
    └── GenreChart

##ページ構成
/メインの探索画面
/favoritesお気に入り一覧
/charts国別ランキング分析（時間があれば

##開発の優先順位
Phase 1（必須）
├── 検索
├── 探索画面（3層表示）
├── 詳細パネル（右側）
├── 30秒プレビュー再生
├── お気に入り機能
├── お気に入りページ
└── 探索履歴ページ

Phase 2（時間があれば）
└── 国別ランキング分析

この構造に（アップルMUSICとはベつに）お気に入り機能をつける。　お気に入りは別ページにする。
これは時間があれば、国ごとの再生数ランキングをデータ化して分析する。人気の音楽ジャンルなどを抽出できるようにする。

# DIGGER 🕳️
> 音楽を「掘る」体験を、そのままUIにした音楽探索アプリ

---

## コンセプト

音楽好きの間では、好きな音楽を探すことを **「掘る（DIG）」** と表現する。

SNSで私の42枚とか、2025年ベストとか発表してる人たくさんいる。

でも既存のサービスでは、その掘った跡が残らない。
Apple MusicやSpotifyのレコメンドは受動的で、自分がどんな経路で音楽を発見したかが見えない。

**DIGGERは探索の経路を穴の断面図のように可視化する。**
自分がどれだけ深く音楽を掘り下げてきたかを、一目で実感できるアプリです。

```
地表  Taylor Swift
  ↓
1m    Olivia Rodrigo
  ↓
2m    Billie Eilish
  ↓
3m    Clairo        ← お宝発見
```

---

## 課題

- 既存の音楽サービスは**アルゴリズムによる受動的なレコメンド**が中心
- 自分の感性で能動的に音楽を探索する手段がない
- 探索の経路や足跡が残らず、「どうやってこのアーティストに辿り着いたか」が振り返れない

---

## 解決

| 価値 | 内容 |
|------|------|
| 能動的な探索 | 好きなアーティストを起点に、関連アーティストを自分の手で芋づる式に掘り下げられる |
| 経路の可視化 | 探索の深さ・経路が穴の断面図のように画面に積み上がっていく |
| 足跡の保存 | 気に入ったアーティストをその場でお気に入りに保存できる |

---

## 機能

### Phase 1（実装済み）
- アーティスト検索
- 関連アーティストの縦積みカード表示（掘り下げUI）
- 30秒プレビュー再生
- お気に入り機能（別ページ）

### Phase 2（追加予定）
- 国別ランキング分析
- 人気ジャンルの可視化

---

## 技術スタック

| 技術 | 用途 |
|------|------|
| React (Vite) | UIフレームワーク |
| React Router | ページ切り替え |
| Last.fm API | 関連アーティスト取得 |
| Apple Music API | アートワーク・プレビュー再生 |
| CSS Modules | スタイリング |

---

## 使い方

```bash
# インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build
```

---

## 環境変数

`.env` ファイルをプロジェクトルートに作成してください。

```
VITE_LASTFM_API_KEY=your_lastfm_api_key
VITE_APPLE_MUSIC_TOKEN=your_apple_music_token
```

---

## 作者

- GitHub: [@IcoIvIa](https://github.com/IcoIvIa)

1 検索周り。
存在しないアーティストは検索できないようにする。また、エンターでページ遷移は誤作動を起こしやすいので、DIGボタンに重なっているときのみエンターを有効にする。また、検索候補を出して誤検出を防ぐ。同一名を一覧で表示させる（藤井　と検索して　藤井フミヤ　と藤井風を選べるようにする）

2 エラーハンドリング　特にAPI周り

３ DigPageのUI改善
*お気に入りに追加をクリックすると、同じお気に入りを無限に追加してしまうのでこれを止める。
*アーティスト画像を表示する。アーティスト情報テキストも追加したい
*下に掘り進むクリックは一番深い層しかクリックできないようにする。（９層目にいた場合　８〜1層はクリックしても掘らない。デーティールパネルの表示はどの層でも有効。それに伴い現在いる層を認識しやすいデザインにする。
*初期検索文字列のDetailPanelに表示を戻せるようにする。（例、星野源を探索中をクリックしたら、デーティールパネルが検索したアーティスト名に戻る）
*ヘッダー要素をスティッキーにして上に戻らなくてもいいようにする。
*AudioPlayerを上部ヘッダーの下もしくは、ヘッダー内に変更する。（簡単に実装できるほうを採用）
*お気に入りモーダルでお気に入りをクリックしても曲を再生できるようにする。（したがってDetailPanelは表示させたままでよい。なおこの際のAudioPlayerの表示は最も実装が簡単な方法を採用する。）

4 ロジックのUIの分離　を進めていく。　冗長なコードを整理。


# 全体の流れ。
HomePage.jsx(初期画面)
↓
検索
↓
DigPage.jsx（検索結果）
↓
検索したアーティストは｛artist}という変数に入る。検索結果にはアーティストに関連しているアーティストが５組表示されたアーティストカードが追加されていく。これを１層とする。アーティストカードのアーティスト名をクリックすると｛artist}にはクリックされたアーティスト名が入り、そのクリックされたアーティストと関連するアーティストが５組下の層に表示する。（第２層目）これを繰り返す。第２０層までは色が変化する。

またクリックされたアーティストの人気曲が右のDetailPanelに表示されて、クリックすると曲を流せる。DetailPanelにはお気に入りに登録ボタンがあり、それをクリックするとその曲にたどり着いた履歴を表示することができる。



HomePage.jsx
│
│ 検索ワード入力
│ DIGボタンクリック
│ handleSearch()
│   └ navigate(`/dig?artist=${query}`)
│
▼
DigPage.jsx
│
│ URLからartistNameを取得
│ useEffect([artistName])
│   └ loadFirstLayer()
│       ├ setSelectedArtist()    → DetailPanel に初期表示
│       ├ setExplorationHistory() → 履歴の起点をセット
│       ├ getSimilarArtists()    → Last.fm API
│       └ setLayers()            → 1層目を表示
│
│ アーティストカードをクリック
│ handleArtistClick(clickedArtist)
│   ├ setSelectedArtist()        → DetailPanel を更新
│   ├ setExplorationHistory()    → 履歴に追加
│   ├ getSimilarArtists()        → Last.fm API
│   └ setLayers()                → 次の層を追加（最大20層・色変化）
│
├─────────────────────────────────────┐
▼                                     ▼
DigLayer.jsx                    DetailPanel.jsx
│                                     │
│ getLayerColor()                     │ getTopTracks() → Last.fm API
│ WaveDivider()                       │ ArtistInfo.jsx
│ ArtistCard.jsx                      │ TrackList.jsx
│                                     │   └ handleTrackClick()
│                                     │       ├ getPreviewUrl() → iTunes API
│                                     │       └ onTrackSelect()
│                                     │           └ AudioPlayer.jsx
│                                     │
│                                     │ お気に入りボタン
│                                     │   └ onAddFavoriteArtist()
│                                     │       └ useFavorites.js
│                                     │           └ localStorage
▼                                     ▼
FavoritesModal.jsx
│
├ お気に入り一覧
├ 探索履歴（explorationHistory）
└ 削除ボタン → removeFavorite()



アーティストカード
DigPage.jsx
│
│ handleArtistClick(clickedArtist, isDeepest)
│ layers.length → currentDepth として渡す
│
▼
DigLayer.jsx
│ props: { layer, onArtistClick, currentDepth }
│
│ isDeepest = layer.depth === currentDepth を計算
│
▼
ArtistCard.jsx
│ props: { artist, layerColor, onArtistClick, isDeepest }
│
│ onClick={() => onArtistClick(artist, isDeepest)}
│                ↑
│          第2引数にisDeepestを渡す
│
▼
DigPage.jsx の handleArtistClick が実行される
│
├── isDeepest === true  → 掘り下げる（setLayers）
└── isDeepest === false → DetailPanelのみ更新（setSelectedArtist）

