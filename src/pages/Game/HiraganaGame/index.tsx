import Card from "@/components/Card";
import { RoundDto, WholeRoundsDto } from "@/models/RoundDto";
import { AppDispatch, RootState } from "@/store";
import { getCardList, SaveWholeRound } from "@/store/modules/cardStore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from "lodash";
import classNames from "classnames";
import dayjs from "dayjs";
import {v4 as uuidv4} from "uuid";
import { useNavigate } from "react-router-dom";
import HiraganaToggleButton from "@/components/HiraganaToggleButton";
import SpeakerButton from "@/components/SpeakerButton";


const HiraganaGame = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [currentSelectedId, setCurrentSelectedId] = useState<string | null>(null);
    const [currentRound, setCurrentRound] = useState<RoundDto | null>(null);
    const [roundCount, setRoundCount] = useState<number>(1);
    const [wholeRound, setWholeRound] = useState<WholeRoundsDto | null>(null);
    const cardList = useSelector((state: RootState) => state.card.cardList);
    const [confirmButtonVisible, setConfirmButtonVisible] = useState<boolean>(true);
    const [finishButtonVisible, setFinishButtonVisible] = useState<boolean>(false);

    const [isAllHiraganaOn, setIsAllHiraganaOn] = useState<boolean>(false);
    const [isAllRomajiOn, setIsAllRomajiOn] = useState<boolean>(false);

    const audioPath = currentRound?.question_card?.audio_play || "a.mp3";

    useEffect(()=>{
        setWholeRound({
            id: uuidv4(),
            rounds: [],
            date: dayjs(new Date()).format("YYYY-MM-DD")
        })
    }, [])

    // 获取cards列表
    useEffect(() => {
        dispatch(getCardList());
    }, [dispatch]);

    useEffect(() => {
        const selectedCards = _.sampleSize(cardList, 5);
        const questionCard = _.sample(selectedCards);
        setCurrentRound({
            id: uuidv4(),
            question_card: questionCard!,
            answer_cards: selectedCards,
            is_correct: false
        });
    }, [cardList]);

    useEffect(() => {
        if (wholeRound?.rounds.length === 10) {
            setRoundCount(10);
            setConfirmButtonVisible(false);
            setFinishButtonVisible(true);
        }
    }, [wholeRound]);

    if (cardList.length === 0) {
        return <div>Loading...</div>;
    }

    const onCardClick = (id: string) => {
        setCurrentSelectedId(id);
    };

    const onFinishClick = () => {
        if (wholeRound){
            dispatch(SaveWholeRound(wholeRound));
            // window.location.reload();
            navigate("/");
        }
    };

    const onConfirmClick = () => {
        console.log("onConfirmClick");

        if (currentRound) {
            if (currentRound.question_card.id === currentSelectedId) {
                currentRound.is_correct = true;
            }
            const updateWholeRound : WholeRoundsDto = {
                ...wholeRound!,
                rounds: [...(wholeRound?.rounds || []), currentRound]
            }
            setWholeRound(updateWholeRound);
            setRoundCount(roundCount+1);

            // 重置状态为下一轮
            const selectedCards = _.sampleSize(cardList, 5);
            const questionCard = _.sample(selectedCards);
            setCurrentRound({
                id: uuidv4(),
                question_card: questionCard!,
                answer_cards: selectedCards,
                is_correct: false
            });
            setCurrentSelectedId(null);
        }
    };

    const onAllHiraganaToggle = () =>{
        setIsAllHiraganaOn(!isAllHiraganaOn);
      }
    
      const onAllRomajiToggle = () =>{
        setIsAllRomajiOn(!isAllRomajiOn);
      }

    return <>
        <div className="flex p-1">
            当前轮数：{roundCount}/10 
            &emsp;
            正确率：{wholeRound?.rounds.filter(round => round.is_correct).length} / 10
        </div>
        <div className="flex p-1">
            打开片假名:<HiraganaToggleButton isOn={isAllHiraganaOn} onToggle={onAllHiraganaToggle}/>
            &emsp;
            打开罗马字:<HiraganaToggleButton isOn={isAllRomajiOn} onToggle={onAllRomajiToggle}/>
        </div>
        {/* <div className="flex p-1">
            
        </div> */}
        <div className="flex justify-center items-center p-4">
            <div className="flex-shrink-0 mx-20">
                {/* <Card card={currentRound?.question_card || defaultCard} is_selected={false} isAllHiraganaOn={isAllHiraganaOn} isAllRomajiOn={isAllRomajiOn}/> */}
                <SpeakerButton audioPath={audioPath}/>
            </div>
            <div className="flex flex-col space-y-4">
                <ul>
                    {currentRound?.answer_cards.map(card =>
                        <li key={card.id} onClick={() => onCardClick(card.id)}>
                            <Card card={card} is_selected={card.id === currentSelectedId} isAllHiraganaOn={isAllHiraganaOn} isAllRomajiOn={isAllRomajiOn}/>
                        </li>)}
                </ul>
            </div>
            <div className="flex-shrink-0 mx-20">
                <button
                    disabled={currentSelectedId === null}
                    className={classNames("bg-green-400 shadow-2xl rounded-3xl text-lg p-2 hover:text-white", { 'invisible': !confirmButtonVisible})}
                    onClick={() => onConfirmClick()}>
                    Confirm
                </button>

                <button className=
                    {classNames("bg-red-500 shadow-2xl rounded-3xl text-lg p-2 hover:text-white ml-4", { "invisible": !finishButtonVisible })}
                    onClick={() => onFinishClick()}>Submit</button>

            </div>
        </div>
    </>;
}

export default HiraganaGame;