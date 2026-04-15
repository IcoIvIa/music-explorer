const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const BASE_URL = 'https://ws.audioscrobbler.com/2.0'

/* last fm API関係 */
/**
 * アーティストを検索する関数
 * @param {string} searchArtistName 検索するアーティスト名
 * @returns アーティストの配列
 */
async function searchArtist(searchArtistName) {
  try{
  const response = await fetch(
    `${BASE_URL}?method=artist.search&artist=${searchArtistName}&api_key=${API_KEY}&format=json`
  )
  const data = await response.json()
  return data?.results.artistmatches?.artist || []}
catch(error){
  console.error(`searchArtistName エラー：`,error)
return []
}}

/**
 * 関連アーティストを取得する関数
 * @param {string} artistName 関連アーティストを取得するアーティスト名
 * @returns 関連アーティストの配列
 */
async function getSimilarArtists(artistName) {
  try {
  const response = await fetch(
    `${BASE_URL}?method=artist.getsimilar&artist=${artistName}&api_key=${API_KEY}&format=json&limit=5`
  )
  const data = await response.json()
  return data?.similarartists?.artist || []
}catch(error){
console.error(`getSimilarArtists エラー：`,error)
return []
}}


/**
 * アーティストの人気曲を取得する関数
 * @param {string} artistName 人気曲を取得するアーティスト名
 * @returns 人気曲の配列
 */
async function getTopTracks(artistName) {
  try{
  const response = await fetch(
    `${BASE_URL}?method=artist.gettoptracks&artist=${artistName}&api_key=${API_KEY}&format=json&limit=5`
  )
  const data = await response.json()
  return data?.toptracks?.track || []
  }catch(error){
    console.error(`getTopTracks エラー:`,error)
    return []
  }
}

export { searchArtist, getSimilarArtists, getTopTracks }