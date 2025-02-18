import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import {createEchartsOptions} from '../../shared/create-echarts-options';
import {px} from '../../shared/px'

// 案发街道统计 条形图
// export const Chart13 = () => {
//   const divRef = useRef(null);
//   const data = [
//     {value: 0.08, name: '东岗路'},
//     {value: 0.06, name: '段家滩'},
//     {value: 0.11, name: '雁北'},
//     {value: 0.09, name: '五泉山'},
//     {value: 0.12, name: '中山路'},
//     {value: 0.06, name: '庆阳路'},
//     {value: 0.08, name: '武都路'},
//     {value: 0.08, name: '酒泉路'},
//     {value: 0.08, name: '天水路'},
//   ];

//   useEffect(() => {
//     const myChart = echarts.init(divRef.current);
//     myChart.setOption(createEchartsOptions({
//       xAxis: {
//         data: data.map(i => i.name),
//         axisTick: {show: false},
//         axisLine: {
//           lineStyle: {color: '#083B70'}
//         },
//         axisLabel: {
//           fontSize: px(15),
//           color: "#4970a7",
//           interval: 0,
//           width: px(15),
//           overflow: "break",
//         },
//       },

//       yAxis: {
//         splitLine: {show: false},
//         axisLine: {
//           show: true,
//           lineStyle: {color: '#083B70'}
//         },
//         axisLabel: {
//           formatter(value) {
//             return (value * 100).toFixed(0) + '%';
//           }
//         }
//       },
//       series: [{
//         type: 'bar',
//         data: data.map(i => i.value),
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//           offset: 0,
//           color: '#0A97FB'
//         }, {
//           offset: 1,
//           color: '#1E34FA'
//         }]),
//       }]
//     }));
//   }, []);

//   return (
//     <div ref={divRef} className="chart"></div>
//   );
// };

export const Chart13 = () => {
  const divRef = useRef(null);
  const data = [
    { type: "超速", processed: 30, unprocessed: 10 },
    { type: "闯红灯", processed: 20, unprocessed: 5 },
    { type: "违停", processed: 10, unprocessed: 5 },
    { type: "酒驾", processed: 8, unprocessed: 4 },
    { type: "逆行", processed: 5, unprocessed: 3 },
  ];

  useEffect(() => {
    const myChart = echarts.init(divRef.current);

    myChart.setOption({
      grid: { left: "3%", right: "4%", bottom: "1%",top:"19%", containLabel: true },
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      xAxis: { type: "category", data: data.map((d) => d.type), axisTick: { show: false } },
      yAxis: { type: "value" },
      legend: { bottom: 0, top: "-1%", textStyle: { color: "#A0CFFF" } },
      series: [
        {
          name: "已处理",
          type: "bar",
          stack: "total",
          data: data.map((d) => d.processed),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#00E3E3" }, // 青色
              { offset: 1, color: "#007BFF" }, // 深蓝
            ]),
          },
          label: { show: true, position: "inside" },
        },
        {
          name: "未处理",
          type: "bar",
          stack: "total",
          data: data.map((d) => d.unprocessed),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#D87AE3" }, // 紫色
              { offset: 1, color: "#F64F59" }, // 粉红
            ]),
          },
          label: { show: true, position: "inside" },
        },
      ],
    });
  }, []);

  return (
        <div className="chart" ref={divRef} />
  );
};
