import {create} from "zustand";

export interface Song {
    id: number | null;
    albumId: number | null;
    title: string| null;
    image: string| null;
    artists: string[]| null;
    album: string| null;
    duration: string| null;
}
export interface Music {
  playlist:{id: string | null};
  song: Song;
  songs: string[];
}

export interface PlayerStore {
  isPlaying: boolean;
  currentMusic: Music;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: Music) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: {id: null}, song:  {
    id:  null,
    albumId:  null,
    title:null,
    image: null,
    artists:  null,
    album:  null,
    duration: null,
}, songs: []},
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
}));
