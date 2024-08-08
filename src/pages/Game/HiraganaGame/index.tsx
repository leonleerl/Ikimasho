
import Card from "@/components/Card";
import { AppDispatch, RootState } from "@/store";
import { getCardList } from "@/store/modules/cardStore";
import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const HiraganaGame = () => {
    const dispatch : AppDispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCardList());
    }, [dispatch])
    const cardList = useSelector((state: RootState) => state.card.cardList);

    return <>
    <div>
    Hiragana Game
    </div>
    <div>
        <ul>
            {cardList.map(card => <li key={card.id}><Card card={card}/></li>)}
        </ul>
    </div>
    </>
}


export default HiraganaGame;