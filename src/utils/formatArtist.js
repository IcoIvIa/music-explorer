
/**
 * Last.fm APIのアーティストデータを使いやすい形に変換する
 * @param {object} artist - Last.fm APIから返ってきたアーティストオブジェクト
 * @param {number} index - mapのindex番号（idとして使用）
 * @returns {object|null} DIGGERで使うアーティストオブジェクト。artistがない場合はnull
 */
function formatArtist (artist,index){
    if (!artist) return null;

        return {
        id: index,
        name: artist.name || 'Unknown Artist',
        genre: '',
        image: artist.image?.[2]?.['#text'] || ''
      };
}

export { formatArtist };