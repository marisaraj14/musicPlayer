import { useState } from "react";
import Player from "./Player";
import PlayList from "./PlayList";
import { useEffect } from "react";

export default function App() {
  const [songList, setSongList] = useState([]);
  const [song, setSong] = useState({
    title: "Song Name",
    artist: "Artist Name",
    path: "default.mp3"
  });

  useEffect(() => {
    async function fetchSongList() {
      const response = await fetch('list.json');
      const list = await response.json();
      if (response.status !== 200) {
        throw Error(list.message);
      }
      setSongList(list);
    }
    fetchSongList();
  },[])

  return (
    <article className="grid grid-cols-1 place-items-center">
      <Player song={song}  />
      <PlayList songList={songList} setSong={setSong} />
    </article>
  )
}

