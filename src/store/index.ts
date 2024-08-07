import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cardReducer from "./modules/cardStore"

const store = configureStore({
    reducer:{
        card: cardReducer
    },
})

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;