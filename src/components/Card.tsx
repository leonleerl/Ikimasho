
import React, { useEffect, useState } from "react";
import { CardDto } from "@/models/CardDto";
import HiraganaToggleButton from "./HiraganaToggleButton";
import RomajiToggleButton from "./RomajiToggleButton";
import SpeakerButton from "./SpeakerButton";
import classNames from "classnames";

interface CardProps {
  card: CardDto
  is_selected: boolean,
  isAllHiraganaOn: boolean,
  isAllRomajiOn: boolean
}

const Card : React.FC<CardProps> = ({card, is_selected, isAllHiraganaOn, isAllRomajiOn})=> {

  const [isHiraganaOn, setIsHiraganaOn] = useState(isAllHiraganaOn);
  const [isRomajiOn, setIsRomajiOn] = useState(isAllRomajiOn);

  useEffect(()=>{
    setIsHiraganaOn(isAllHiraganaOn);
  }, [isAllHiraganaOn])

  useEffect(() => {
    setIsRomajiOn(isAllRomajiOn);
  }, [isAllRomajiOn]);
  
  const onHiraganaToggle = () =>{
    setIsHiraganaOn(!isHiraganaOn);
  }

  const onRomajiToggle = () =>{
    setIsRomajiOn(!isRomajiOn);
  }
    return <>
        <div
              className={classNames(
                "p-4 max-w-sm mx-auto rounded-xl shadow-2xl flex items-center justify-center space-x-4 m-8 w-48 h-24 bg-pink-200 hover:bg-gray-800 group",
                {
                  "border-4 border-blue-500": is_selected,
                  "border-4 border-transparent": !is_selected,
                }
              )}
        >
        <div className="text-center">
          <div className="text-5xl font-medium text-black group-hover:text-green-400">
            {isHiraganaOn?card.name_katakana:card.name_hiragana}</div>
        </div>

        <span className = {classNames("text-slate-500 group-hover:text-green-400 text-2xl", {
          "visible" : isRomajiOn,
          "invisible" : !isRomajiOn})}>
            {card.name_romaji}
        </span>
        <div>
          <div>
          <HiraganaToggleButton isOn={isHiraganaOn} onToggle={onHiraganaToggle}/>
          <SpeakerButton audioPath={card.audio_play}/>

          <RomajiToggleButton isOn={isRomajiOn} onToggle={onRomajiToggle}/>
          </div>
        </div>
      </div>
    </>
}



export default Card;