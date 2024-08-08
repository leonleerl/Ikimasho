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
    const cardList = useSelector((state: RootState) => state.card.cardList).slice(0,5);

    if (cardList.length === 0){
        return <div>Loading...</div>
    }

    return <>
    <div className="flex justify-center items-center p-4">

        <div className="flex-shrink-0 mx-20">
            <Card card={cardList[2]}/>
        </div>
        <div className="flex flex-col space-y-4">
            <ul>
                {cardList.map(card => <li key={card.id}><Card card={card}/></li>)}
            </ul>
        </div>
    </div>
    </>
}


export default HiraganaGame;