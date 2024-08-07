import { Card } from "@/models/Card";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "..";

interface CardState {
    cardList: Card[];
}
  
const initialState: CardState = {
    cardList: [],
};

const cardStore = createSlice({
    name: "card",
    initialState: initialState,
    reducers:{
        setCardList(state, action: PayloadAction<Card[]>){
            state.cardList = action.payload;
        }
    }
})

const {setCardList} = cardStore.actions;

// 异步
const getCardList = (): AppThunk =>{
    return async(dispatch) => {
        const res = await axios.get<Card[]>("http://localhost:8888/cards");
        dispatch(setCardList(res.data));
    }
}

export {getCardList};
const reducer = cardStore.reducer;

export default reducer;