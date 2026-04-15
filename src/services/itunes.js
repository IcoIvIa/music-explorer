/**
 * iTunes Search APIから曲のプレビューURLを取得する関数
 * @param {string} trackName 曲名
 * @param {string} artistName アーティスト名
 * @returns プレビューURL（見つからない場合はnull）
 */

async function getPreviewUrl(trackName, artistName) {
    try{
    const searchQuery = encodeURIComponent(`${trackName} ${artistName}`)
    const response = await fetch(
        `https://itunes.apple.com/search?term=${searchQuery}&entity=song&limit=1`
    )
    const data = await response.json()

    if(data.results.length === 0) return null
    return data.results[0].previewUrl
}catch(error){
console.error(`getPreviewUrlエラー：${error}`)
}}

export { getPreviewUrl }