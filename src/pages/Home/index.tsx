import { WholeRoundsDto } from "@/models/RoundDto";
import { AppDispatch, RootState } from "@/store";
import { getAllRounds } from "@/store/modules/cardStore";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import _ from 'lodash';

import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption
>;

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

    useEffect(() => {
        const chartDom = document.getElementById('main')!;
        const myChart = echarts.init(chartDom);
        const option: EChartsOption = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            }
          ]
        };
    
        option && myChart.setOption(option);
      }, []);

    const onSelectChanged = (event: ChangeEvent<HTMLSelectElement>) =>{
        const currentSelectedDate = event.target.value
        setSelectedDate(currentSelectedDate);
        const currentDateRounds = roundsList.filter(item => item.date === currentSelectedDate);
        setDateRounds(currentDateRounds);
    }

    return <>
        <div style={{ display: 'flex', width: '100%', height: '400px' }}>
      {/* 左边部分 */}
      <div style={{ flex: 1, padding: '20px' }}>
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
                            <td className="px-6 py-4 whitespace-nowrap w-1/3">{correctRounds}/{totalRounds}</td>
                            <td className="px-6 py-4 whitespace-nowrap w-2/3">{incorrectHiragana}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </div>

      {/* 右边部分 */}
      <div style={{ flex: 1 }}>
        <div id="main" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
    </>
}


export default Home;