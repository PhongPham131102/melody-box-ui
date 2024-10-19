import PlayList from "../Playlist";

export default function PlayLists() {
  return (
    <div className="w-full flex flex-col  gap-2 px-3 py-4">
      <div className="w-full flex justify-between items-center py-2">
        <span className="text-white font-bold text-lg">
          Nhạc Hot Thịnh Hành
        </span>
        {/* <button className="group text-white text-xs bg-main-text hover:brightness-90 py-1 px-3 rounded-full flex gap-1 uppercase">
          Làm mới
        </button> */}
      </div>
      <div className="w-full grid grid-cols-5 gap-4">
        <PlayList />
        <PlayList />
        <PlayList />
        <PlayList />
        <PlayList />
      </div>
    </div>
  );
}
