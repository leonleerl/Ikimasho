import { RoundDto, WholeRoundsDto } from "@/models/RoundDto";
import { AppDispatch, RootState } from "@/store";
import { getAllRounds } from "@/store/modules/cardStore";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from 'lodash';

const Home = () =>{

    const dispatch : AppDispatch= useDispatch();

    const roundsList : WholeRoundsDto[] = useSelector((state: RootState) => state.card.roundsListGet);
    const [dates, setDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>();
    const [dateRounds, setDateRounds] = useState<WholeRoundsDto[]>();


    useEffect(()=>{
        dispatch(getAllRounds());
    }, [dispatch])

    useEffect(()=>{
        const extractedDates = _.uniq(roundsList.map(round=>round.date));
        setDates(extractedDates);
        setSelectedDate(extractedDates[0])
    }, [roundsList])

    const onSelectChanged = (event: ChangeEvent<HTMLSelectElement>) =>{
        const currentSelectedDate = event.target.value
        setSelectedDate(currentSelectedDate);
        const currentDateRounds = roundsList.filter(item => item.date === currentSelectedDate);
        setDateRounds(currentDateRounds);
    }

    return <>
            <select name="options" onChange={onSelectChanged}>
                {dates.map((date, index) => (
                    <option key={index} value={date} >
                        {date}
                    </option>
                ))}
            </select>
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">正确率</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">错误的平假名</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {dateRounds?.map(item => {
                    const totalRounds = item.rounds.length;
                    const correctRounds = item.rounds.filter(round => round.is_correct).length;
                    const incorrectHiragana = item.rounds
                        .filter(round => !round.is_correct)
                        .map(round => round.question_card.name_hiragana)
                        .join('、');

                    return (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{correctRounds}/{totalRounds}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{incorrectHiragana}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    </>
}


export default Home;