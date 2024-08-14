import { WholeRoundsDto } from "@/models/RoundDto";
import { AppDispatch, RootState } from "@/store";
import { getAllRounds } from "@/store/modules/cardStore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Home = () =>{

    const dispatch : AppDispatch= useDispatch();

    const roundsList : WholeRoundsDto[] = useSelector((state: RootState) => state.card.roundsListGet);
    const [list, setList] = useState<WholeRoundsDto[]>([]);


    useEffect(()=>{
        dispatch(getAllRounds());
    }, [dispatch])

    useEffect(()=>{

        console.log("roundList ready!!!");
        
        setList(roundsList);
    }, [roundsList])

    return <>
    <select name="options">
        <option value="option1">2024</option>
        <option value="option2">2023</option>
    </select>
    <span>年</span>
    <select name="options">
        <option value="option1">6</option>
        <option value="option2">7</option>
        <option value="option2">8</option>
    </select>
    <span>月</span>
    <select name="options">
        <option value="option1">1</option>
        <option value="option2">3</option>
    </select>
    <span>日</span>

    </>
}


export default Home;