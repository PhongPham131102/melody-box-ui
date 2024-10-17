// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "@/src/store/slices/player.slide";
import uiReducer from "@/src/store/slices/ui.slide";
export const store = () => {
  return configureStore({
    reducer: { player: playerReducer, ui: uiReducer },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
