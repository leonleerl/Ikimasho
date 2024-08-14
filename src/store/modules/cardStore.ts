import { CardDto } from "@/models/CardDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "..";
import { WholeRoundsDto } from "@/models/RoundDto";

interface CardState {
    cardList: CardDto[];
    roundsListPost : WholeRoundsDto[],
    roundsListGet : WholeRoundsDto[]
}
  
const initialState: CardState = {
    cardList: [],
    roundsListPost: [],
    roundsListGet: []
};

const cardStore = createSlice({
    name: "card",
    initialState: initialState,
    reducers:{
        setCardList(state, action: PayloadAction<CardDto[]>){
            state.cardList = action.payload;
        },
        setGetAllRounds(state, action:PayloadAction<WholeRoundsDto[]>){
            state.roundsListGet = action.payload;
        },
            // 同步修改方法
        setSaveWholeRound(state, action:PayloadAction<WholeRoundsDto>) {
            state.roundsListPost.push(action.payload);
      },
    }
})

const {setCardList, setGetAllRounds, setSaveWholeRound} = cardStore.actions;

// 获取卡片
const getCardList = (): AppThunk =>{
    return async(dispatch) => {
        const res = await axios.get<CardDto[]>("http://localhost:8888/cards");
        dispatch(setCardList(res.data));
    }
}

const getAllRounds = ():AppThunk =>{
    return async(dispatch) => {
        const res = await axios.get<WholeRoundsDto[]>("http://localhost:8888/rounds");
        dispatch(setGetAllRounds(res.data));
    }
}

const SaveWholeRound = (data: WholeRoundsDto) : AppThunk =>{
    return async (dispatch) =>{
        const res = await axios.post("http://localhost:8888/rounds",data);
        dispatch(setSaveWholeRound(res.data));
    }
}



export {getCardList, getAllRounds, SaveWholeRound};
const reducer = cardStore.reducer;

export default reducer;