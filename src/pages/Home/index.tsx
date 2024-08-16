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
    const [loading, setLoading] = useState<boolean>(true); // 添加加载状态

    useEffect(()=>{
        dispatch(getAllRounds());
    }, [dispatch])

    useEffect(()=>{
        if(roundsList.length > 0){    
            const extractedDates = _.uniq(roundsList.map(round=>round.date));
            setDates(extractedDates);
            // 展示今天的内容，即日期数组最后一个
            setSelectedDate(extractedDates[extractedDates.length-1])
            setLoading(false); // 数据加载完成后取消加载状态
        }
    }, [roundsList])

    // 当 selectedDate 改变或 roundsList 初始化时更新 dateRounds
    useEffect(()=>{
        if(!loading && selectedDate){
            const currentDateRounds = roundsList.filter(item => item.date === selectedDate).reverse();
            setDateRounds(currentDateRounds);
        }
    }, [selectedDate, loading, roundsList])


    useEffect(() => {
        const chartDom = document.getElementById('main')!;
        const myChart = echarts.init(chartDom);
        const xLabel = _.range(1, (dateRounds?.length || 1)+1).map(item => `第${item}次`);
        const option: EChartsOption = {
          xAxis: {
            type: 'category',
            data: xLabel,
            axisLabel:{
                interval:0
            }
          },
          yAxis: {
            type: 'value',
            min:0,
            max:10,
          },
          series: [
            {
              data: dateRounds?.map(round => round.rounds.filter(item => item.is_correct).length).reverse(),
              type: 'line'
            }
          ]
        };
    
        option && myChart.setOption(option);
      }, [dateRounds]);

    const onSelectChanged = (event: ChangeEvent<HTMLSelectElement>) =>{
        const currentSelectedDate = event.target.value
        setSelectedDate(currentSelectedDate);
        const currentDateRounds = roundsList.filter(item => item.date === currentSelectedDate).reverse();
        setDateRounds(currentDateRounds);
    }

    return <>
        <div style={{ display: 'flex', width: '100%', height: '400px' }}>
      {/* 左边部分 */}
      <div style={{ flex: 1, padding: '20px' }}>
      <select name="options" onChange={onSelectChanged} value={selectedDate}>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">做错的平假名</th>
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