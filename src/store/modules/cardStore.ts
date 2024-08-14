import { CardDto } from "@/models/CardDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "..";
import { WholeRoundsDto } from "@/models/RoundDto";

interface CardState {
    cardList: CardDto[];
    roundsList : WholeRoundsDto[]
}
  
const initialState: CardState = {
    cardList: [],
    roundsList: []
};

const cardStore = createSlice({
    name: "card",
    initialState: initialState,
    reducers:{
        setCardList(state, action: PayloadAction<CardDto[]>){
            state.cardList = action.payload;
        },
            // 同步修改方法
        setSaveRound(state, action:PayloadAction<WholeRoundsDto>) {
        state.roundsList.push(action.payload);
      },
    }
})

const {setCardList, setSaveRound} = cardStore.actions;

// 获取卡片
const getCardList = (): AppThunk =>{
    return async(dispatch) => {
        const res = await axios.get<CardDto[]>("http://localhost:8888/cards");
        dispatch(setCardList(res.data));
    }
}

const SaveRound = (data: WholeRoundsDto) : AppThunk =>{
    return async (dispatch) =>{
        const res = await axios.post("http://localhost:8888/rounds",data);
        dispatch(setSaveRound(res.data));
    }
}



export {getCardList, SaveRound};
const reducer = cardStore.reducer;

export default reducer;