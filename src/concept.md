##理想の音楽再生アプリを作る。


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
├── アーティスト探索（縦積みカード）
├── 30秒プレビュー再生
└── お気に入り機能 + 別ページ

Phase 2（時間があれば）
└── 国別ランキング分析

この構造に（アップルMUSICとはベつに）お気に入り機能をつける。　お気に入りは別ページにする。
これは時間があれば、国ごとの再生数ランキングをデータ化して分析する。人気の音楽ジャンルなどを抽出できるようにする。