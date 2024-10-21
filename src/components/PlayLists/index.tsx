import PlayList, { PlayListProps } from "../Playlist";
type PlayLists = {
  title: string;
  linkUrl?: string;
  textUrl?: string;
  playlists: PlayListProps[];
};
export default function PlayLists({
  linkUrl,
  textUrl,
  title,
  playlists,
}: PlayLists) {
  return (
    <div className="w-full flex flex-col  gap-2 px-3 py-4">
      <div className="w-full flex justify-between items-center py-2">
        <span className="text-white font-bold text-lg">{title}</span>
        {linkUrl && (
          <button className="group text-white text-xs bg-main-text hover:brightness-90 py-1 px-3 rounded-full flex gap-1 uppercase">
            {textUrl}
          </button>
        )}
      </div>
      <div className="w-full grid grid-cols-5 gap-4">
        {playlists.map((playlist, index) => (
          <PlayList
            key={index}
            imgUrl={playlist.imgUrl}
            linkUrl={playlist.linkUrl}
            title={playlist.title}
          />
        ))}
      </div>
    </div>
  );
}
