// store/slices/playerSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface PlayerState {
  shuffle: boolean;
  isPlaying: boolean;
  repeatMode: "none" | "one" | "all";
}

const initialState: PlayerState = {
  shuffle: false,
  isPlaying: false,
  repeatMode: "none",
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
  },
});

export const { toggleShuffle, togglePlayPause, setRepeatMode } =
  playerSlice.actions;
export default playerSlice.reducer;
