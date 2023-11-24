import { usePlayerStore } from "@/store/playerStore";
import { Play, Pause } from "./Player";

export const CardPlayButton = ({id}) => {

  const { currentMusic,isPlaying,setCurrentMusic,setIsPlaying} = usePlayerStore(state => state)


  const handleClick =()=> {

    if(isPlayingPlayList){
      setIsPlaying(false)
      return
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then( data =>{
        const { songs, playlist} = data;
        setIsPlaying(true)
        setCurrentMusic({songs, playlist, song: songs[0] })
      })
  }

  const isPlayingPlayList = isPlaying && currentMusic?.playlist.id === id

  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-4">
      { isPlayingPlayList ?  <Pause/> : <Play/>}
    </button>
  );
};
