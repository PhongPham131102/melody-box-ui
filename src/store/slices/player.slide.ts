// store/slices/playerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  shuffle: boolean;
  isPlaying: boolean;
  repeatMode: "none" | "one" | "all";
  volume: number;
  isMuted: boolean;
}

const initialState: PlayerState = {
  shuffle: false,
  isPlaying: false,
  repeatMode: "none",
  volume: 100,
  isMuted: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setRepeatMode: (state) => {
      if (state.repeatMode === "none") {
        state.repeatMode = "all";
      } else if (state.repeatMode === "all") {
        state.repeatMode = "one";
      } else {
        state.repeatMode = "none";
      }
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      if (state.volume > 0) {
        state.isMuted = false;
      }
    },
    toggleMute: (state) => {
      if (state.isMuted) {
        state.isMuted = false;
      } else {
        state.isMuted = true;
      }
    },
  },
});

export const {
  toggleShuffle,
  togglePlayPause,
  setRepeatMode,
  setVolume,
  toggleMute,
} = playerSlice.actions;
export default playerSlice.reducer;
