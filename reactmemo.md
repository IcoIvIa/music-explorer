function App() {
  const[query, setQuery] = useState('')

  ＊query → 普通の変数（現在の値が入っている）
  ＊setQuery → 関数が入っている変数

  ＃普通の変数と違い、Reactの画面を更新するには専用の関数（setQuery）を使う必要がある。
  
  // ❌ これだと画面が変わらない
　　　query = "Kendrick Lamar"

　// ✅ これで画面が更新される
　　　setQuery("Kendrick Lamar")

      <input
        type="text"
        placeholder="アーティスト名を入力..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      type="text"           → テキスト入力欄
      placeholder="..."     → 何も入力していないときのヒント文字
      value={query}         → 入力欄の中身をqueryと同期する
      onChange={...}        → 文字を入力するたびに実行される処理

      ##Reactのコンポーネントの基本形
      jsxfunction コンポーネント名() {
         return (
           // JSXをここに書く
       )
      }
        export default コンポーネント名

        #覚えておくべきルール

        ## 1　関数名は大文字始まり
        // ✅ 正しい
          function FavoritesPage() {}

        // ❌ ダメ（小文字始まりはHTMLタグと区別できない）
          function favoritesPage() {}

        ## 2 return は1つの親要素で囲む
        // ✅ 正しい
        return (
          <div>
            <h1>タイトル</h1>
            <p>本文</p>
          </div>
        )

        // ❌ ダメ（親要素が2つある）
        return (
          <h1>タイトル</h1>
          <p>本文</p>
        )

        ## 3 ③ export defaultを忘れない


#javascriptの関数たち
        ##スプレッド構文（jSでも使える！
        const arr1 = [1, 2, 3]
        const arr2 = [...arr1, 4, 5]
        console.log(arr2) // [1, 2, 3, 4, 5]

        // オブジェクトにも使える
        const obj1 = { name: 'Taylor' }
        const obj2 = { ...obj1, genre: 'Pop' }
        console.log(obj2) // { name: 'Taylor', genre: 'Pop' }

        .map() はJavaScriptの配列メソッドです。
        javascript// 普通のJSでの例
        [1, 2, 3].map((num) => num * 2)
        // → [2, 4, 6]
        配列の中身を1つずつ取り出して、何かに変換した新しい配列を返します。

        ##三項演算子（JSでもある
          // 13層目までは黒字、14層目以降は白字
          const textColor = depth <= 13 ? '#1a0f2e' : '#f3e8ff'
          const textColorMuted = depth <= 13 ? 'rgba(26,15,46,0.5)' : 'rgba(243,232,255,0.4)'

          return { bg, shadow1: shadowDark, shadow2: shadowLight, textColor, textColorMuted }
          }

          // 三項演算子　条件が複雑になると読みにくくなるのでIFと使いわけるといい。
          const textColor = depth <= 13 ? '#1a0f2e' : '#f3e8ff'

          // if文で書いた場合（同じ意味）
          let textColor
          if (depth <= 13) {
          textColor = '#1a0f2e'
          } else {
          textColor = '#f3e8ff'
          }

          #リアクトには　カスタムフック　コンポーネント　関数がある。

          ## 関数
          おなじみのやつ。計算して結果を返す

          ##コンポーネント
          JSXを返す
          1. 基本ルール名前は大文字で開始: コンポーネント名はMyComponentのようにキャメルケース（キャメルケース（camelCase）＝単語の区切りを大文字でつなぐ書き方）で、必ず大文字から始めます。小文字で始めるとHTMLタグとして認識されます。1つのルート要素: JSXは必ず単一の親要素（<div>や<></>（フラグメント））で囲む必要があります。propsは不変: 受け取ったpropsは変更してはいけません（純関数のように振る舞う）。
          ##カスタムフック
          
          複雑化を回避できる　viewとロジックを分離できる？
          機能を再利用できる　ロジックだけ再利用できる？
          複数のhooksをまとめることができる
          ！命名は必ず "use" で始まる

          ##リアクトのプロップスについて
          親コンポーネントから子コンポーネントへデータを渡すための「読み取り専用」の引数です。コンポーネントの再利用性を高め、動的な表示（色やテキストの変更）を実現する必須の仕組みです。属性として渡され、子コンポーネントで受け取ります
          React のコンポーネント
          └── props（UI のためにまとめられた引数のセット）