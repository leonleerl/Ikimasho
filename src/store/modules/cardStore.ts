import { CardDto } from "@/models/CardDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "..";
import { RoundDto } from "@/models/RoundDto";

interface CardState {
    cardList: CardDto[];
}
  
const initialState: CardState = {
    cardList: [],
};

const cardStore = createSlice({
    name: "card",
    initialState: initialState,
    reducers:{
        setCardList(state, action: PayloadAction<CardDto[]>){
            state.cardList = action.payload;
        },
            // 同步修改方法
        setAddCard(state, action) {
        state.cardList = action.payload;
      },
    }
})

const {setCardList, setAddCard} = cardStore.actions;

// 获取卡片
const getCardList = (): AppThunk =>{
    return async(dispatch) => {
        const res = await axios.get<CardDto[]>("http://localhost:8888/cards");
        dispatch(setCardList(res.data));
    }
}

// const addBillList = (data) => {
//     return async (dispatch) => {
//       const res = await axios.post("http://localhost:8888/ka", data);
//       dispatch(addBill(res.data));
//     };
//   };
const AddCard = (data: RoundDto[]) : AppThunk =>{
    return async (dispatch) =>{
        const res = await axios.post("http://localhost:8888/cards");
        dispatch(setAddCard(res.data));
    }
}



export {getCardList, AddCard};
const reducer = cardStore.reducer;

export default reducer;