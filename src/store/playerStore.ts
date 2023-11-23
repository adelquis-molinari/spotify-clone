import {create} from "zustand";

interface Music {
  playlist: string | null;
  song: string | null;
  songs: string[];
}

interface PlayerStore {
  isPlaying: boolean;
  currentMusic: Music;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentMusic: (currentMusic: Music) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
}));
