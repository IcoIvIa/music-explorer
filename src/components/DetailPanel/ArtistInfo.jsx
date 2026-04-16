/**
 * アーティストの画像と名前を表示するコンポーネント
 * @param {object} artist アーティスト情報
 */
function ArtistInfo({ artist }) {

  return (
    <div className="flex flex-col gap-4">
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
        //画像がない場合のイニシャル表示
        <div
          className="w-full aspect-square rounded-2xl flex items-center justify-center text-4xl font-bold"
          style={{
            background: '#2d1b69',
            color: '#f9a8d4',
            boxShadow: 'inset 3px 3px 8px #1a0f3e, inset -3px -3px 8px #3d2882'
          }}
        >
          {artist.name.slice(0, 2).toUpperCase()}
        </div>
     

      {/* アーティスト名 */}
      <div>
        <p
          className="text-lg font-bold tracking-wide"
          style={{ color: '#f3e8ff' }}
        >
          {artist.name}
        </p>
      </div>
    </div>
  )
}

export default ArtistInfo