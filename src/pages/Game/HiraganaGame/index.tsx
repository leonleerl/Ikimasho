import Card from "@/components/Card";
import { RoundDto } from "@/models/RoundDto";
import { AppDispatch, RootState } from "@/store";
import { getCardList } from "@/store/modules/cardStore";
import { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";




const HiraganaGame = () => {
    const dispatch : AppDispatch = useDispatch();
    const [currentSelected, setCurrentSelected] = useState<number|null>(null);
    const [wholeRound, setWholeRound] = useState<RoundDto[] | null>([])

    useEffect(()=>{
        dispatch(getCardList());
    }, [dispatch])
    const cardList = useSelector((state: RootState) => state.card.cardList).slice(0,5);

    if (cardList.length === 0){
        return <div>Loading...</div>
    }

    const onCardClick = (id:number) =>{
        setCurrentSelected(id);
        const selectedCard = cardList.find(card => card.id === id);
        console.log("CurrentId:"+currentSelected+"\nCurrentHiragana:"+selectedCard?.name_hiragana)
    }

    return <>
    <div className="flex justify-center items-center p-4">
        <div className="flex-shrink-0 mx-20">
            <Card card={cardList[2]} is_selected={false}/>
        </div>
        <div className="flex flex-col space-y-4">
            <ul>
                {cardList.map(card => 
                    <li key={card.id} onClick={()=>onCardClick(card.id)}>
                        <Card card={card} is_selected={card.id === currentSelected}/>
                    </li>)}
            </ul>
        </div>
        <div className="flex-shrink-0 mx-20">
            <button className="bg-green-400 rounded-3xl text-lg p-2 hover:text-white">Confirm</button>
        </div>
    </div>
    </>
}


export default HiraganaGame;