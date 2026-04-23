/**
 * アーティストの画像と名前を表示するコンポーネント
 * @param {object} artist アーティスト情報
 */
function ArtistInfo({ artist }) {

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* アーティスト画像 */}
      {/* {artist.image && artist.image[3]?.['#text'] ? (
        //画像がある場合
        <img
          src={artist.image[3]['#text']}
          alt={artist.name}
          className="w-full aspect-square rounded-2xl object-cover"
          style={{
            boxShadow: '4px 4px 10px #1a0f3e, -4px -4px 10px #3d2882'
          }}
        />
      ) : (  )}*/}
        <div
          className="w-full aspect-square rounded-2xl flex items-center justify-center text-4xl font-bold bg-surface shadow-neu-inset text-[#f9a8d4]">
        {artist.name.slice(0, 2).toUpperCase()}

        </div>
     

      {/* アーティスト名 */}
      <p className="text-lg font-bold tracking-wide text-[#f3e8ff] truncate"
      title={artist.name}>
        {artist.name}
      </p>
    </div>
  )
}

export default ArtistInfo