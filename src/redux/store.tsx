import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import weather from "redux/weatherSlice";

export const store = configureStore({
  reducer: {
    weather,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
