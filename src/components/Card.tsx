
import React, { useState } from "react";
import { CardDto } from "@/models/CardDto";
import HiraganaToggleButton from "./HiraganaToggleButton";
import RomajiToggleButton from "./RomajiToggleButton";
import SpeakerButton from "./SpeakerButton";

interface CardProps {
  card: CardDto
}

const Card : React.FC<CardProps> = ({card})=> {

  const [isHiraganaOn, setIsHiraganaOn] = useState(false);
  const [isRomajiOn, setIsRomajiOn] = useState(false);

  const onHiraganaToggle = () =>{
    setIsHiraganaOn(!isHiraganaOn);
  }

  const onRomajiToggle = () =>{
    setIsRomajiOn(!isRomajiOn);
  }

    return <>
        <div className="p-4 max-w-sm mx-auto bg-pink-200 rounded-xl shadow-lg flex items-center justify-center space-x-4 m-8 w-48 h-24 hover:bg-gray-800 group">
        <div className="text-center">
          <div className="text-5xl font-medium text-black group-hover:text-green-400">
            {isHiraganaOn?card.name_katakana:card.name_hiragana}</div>
        </div>
        <span className = {
            isRomajiOn ?
            "text-slate-500 group-hover:text-green-400 text-2xl visible"
            :"text-slate-500 group-hover:text-green-400 text-2xl invisible"
            }>
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