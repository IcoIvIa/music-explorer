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