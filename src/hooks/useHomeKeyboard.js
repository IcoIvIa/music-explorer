import { useState, useCallback } from 'react'

/**
 * HomePage のキーボード操作を管理するカスタムフック
 *
 * 動作：
 * - 上下キー        → サジェスト内を移動
 * - Enter（1回目）  → サジェストで選択中の候補 or 現在のクエリを確定
 * - Enter（2回目）  → handleSearch() を呼んで /dig へ遷移
 * - Escape          → サジェストを閉じる
 *
 * @param {object} params
 * @param {string}   params.query               現在の入力値
 * @param {function} params.setQuery            入力値を更新する関数
 * @param {array}    params.suggestions         サジェスト候補の配列
 * @param {function} params.setSuggestions      サジェストを更新する関数
 * @param {function} params.handleSearch        検索実行関数
 */
function useHomeKeyboard({ query, setQuery, suggestions, setSuggestions, handleSearch }) {
  // サジェスト内でハイライト中のindex（-1 = 未選択）
  const [highlightIndex, setHighlightIndex] = useState(-1)
  // クエリ確定済みかどうか（Enter2回目で検索）
  const [confirmed, setConfirmed] = useState(false)

  /**
   * 入力が変わったときに confirmed をリセットする
   * HomePage側で handleInputChange と合わせて呼ぶ
   */
  const resetConfirmed = useCallback(() => {
    setConfirmed(false)
    setHighlightIndex(-1)
  }, [])

  /**
   * キーダウンイベントハンドラ
   * SearchBar の onKeyDown に渡す
   */
  const handleKeyDown = useCallback((e) => {
    // サジェストが表示されていないとき
    if (suggestions.length === 0) {
      if (e.key === 'Enter') {
        if (confirmed) {
          // Enter2回目：検索実行
          handleSearch()
        } else {
          // Enter1回目：クエリ確定（サジェストなし）
          setConfirmed(true)
        }
      }
      return
    }

    // サジェストが表示されているとき
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex(prev => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightIndex >= 0) {
        // サジェストで選択中の候補を確定
        setQuery(suggestions[highlightIndex].name)
        setSuggestions([])
        setHighlightIndex(-1)
        setConfirmed(true)
      } else if (confirmed) {
        // すでに確定済みなら検索実行
        handleSearch()
      } else {
        // 現在のクエリをそのまま確定
        setSuggestions([])
        setConfirmed(true)
      }
    } else if (e.key === 'Escape') {
      setSuggestions([])
      setHighlightIndex(-1)
    }
  }, [suggestions, highlightIndex, confirmed, setQuery, setSuggestions, handleSearch])

  return { highlightIndex, handleKeyDown, resetConfirmed }
}

export default useHomeKeyboard