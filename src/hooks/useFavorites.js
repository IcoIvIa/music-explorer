import { useState } from 'react'

/**
 *  * お気に入りを管理するカスタムフック
 * ローカルストレージと同期しながらお気に入りの追加・削除・確認ができる
 * return savedFavorites ?について。localStorageは文字列しか保存できないため、データがあった場合JSON.parseでJSON文字列を配列に変換
 * @returns お気に入りがはいったJSONデータ
 * @returns favorites   お気に入りアーティストの配列
 * @returns addFavorite    お気に入りに追加する関数
 * @returns removeFavorite お気に入りから削除する関数
 * @returns isFavorite     お気に入りかどうか確認する関数
 */
function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites')
    return savedFavorites ? JSON.parse(savedFavorites) : []
  })

  /**
   * const newFavorites　今のお気に入り配列（favorites）に新しいアーティスト（artist）を追加した新しい配列を作成する関数
   * newFavorites を JSON 文字列に変換して、localStorage の favorites という名前で保存する
   * if (isFavorite(addArtistName.name) ) returnで多重登録を防止。
   * @param {object}  
   * DetailPanel.jsx の「お気に入りに追加」ボタンクリック時に
 * onAddFavoriteArtist(artist) → DigPage.jsx の addFavorite 
 * を経由して渡されるアーティストオブジェクト
 * { id, name, genre, image } の形式
   */
  function addFavorite(addArtistName, histortAtClickFavorite) {

    if (isFavorite(addArtistName.name) ) return
    const artistWithHistory ={
      ...addArtistName,
      frozenHistory: [...histortAtClickFavorite]
    }
    const newFavorites = [...favorites, artistWithHistory]
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))

  }

/**
 * 指定のアーティストを削除する関数
 * favorites配列から.filter()でremoveArtistNameと一致しない要素だけを残す
 * @param {string} removeArtistName 削除するアーティスト名
 */
  function removeFavorite(removeArtistName) {
    const newFavorites = favorites.filter(
      (favorite) => favorite.name !== removeArtistName
    )
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  /**
   * お気に入りかどうか確認する関数
   * @param {string} checkArtistName 確認するアーティスト名
   */
  function isFavorite(checkArtistName) {
    return favorites.some(
      (favorite) => favorite.name === checkArtistName
    )
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
}

export default useFavorites