
import React from "react";
import ToggleButton from "./ToggleButton";
import { CardDto } from "@/models/CardDto";

interface CardProps {
  card: CardDto
}
const Card : React.FC<CardProps> = ({card})=> {

    return <>
        <div className="p-4 max-w-sm mx-auto bg-pink-200 rounded-xl shadow-lg flex items-center justify-center space-x-4 m-5 w-60 h-28 hover:bg-gray-800 group">
        <div className="text-center">
          <div className="text-5xl font-medium text-black group-hover:text-green-400">{card.name_hiragana}</div>
          <p className="text-slate-500 group-hover:text-green-400">{card.name_romaji}</p>
        </div>
        <div>
          <div>
          <ToggleButton/>
          <span>🎵</span>
          <ToggleButton/>
          </div>
        </div>
        <div>
        </div>
      </div>
    </>
}



export default Card;