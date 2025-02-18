import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import type {/*EChartsOption,*/ ECharts} from 'echarts'
import {createEchartsOptions} from '../../shared/create-echarts-options'

// type seriesData = Array<{ name: string, '2021'?: number, '2022'?: number, }>

// // 案件破获排名
// export const Chart2 = () => {
//   // 获取节点
//   const divRef = useRef(null)
//   const myChart = useRef(null)
//   const data = [
//     {name: '城关区公安局', 2011: 1, 2012: 2},
//     {name: '七里河区公安局', 2011: 2, 2012: 3},
//     {name: '西固区公安局', 2011: 3, 2012: 4},
//     {name: '安宁区公安局', 2011: 4, 2012: 5},
//     {name: '红古区公安局', 2011: 5, 2012: 6},
//     {name: '永登县公安局', 2011: 6, 2012: 7},
//     {name: '皋兰县公安局', 2011: 7, 2012: 8},
//     {name: '榆中县公安局', 2011: 8, 2012: 9},
//     {name: '新区公安局', 2011: 9, 2012: 10},
//   ]

//   const random10 = () => Math.random() * 10

//   const genXAxis = (/*data*/) => ({
//     type: 'value',
//     boundaryGap: [0, 0.01],
//     splitLine: {show: false},
//     axisLabel: {show: false}
//   })

//   const genYAxis = (data: seriesData) => ({
//     axisTick: {show: false},
//     type: 'category',
//     data: data.map(i => i.name),
//     axisLabel: {
//       formatter(val: string) {
//         return val.replace('公安局', '\n公安局')
//       }
//     }
//   })

//   const genSeries = (data: seriesData) => ([
//     {
//       name: '2011年',
//       type: 'bar',
//       data: data.map(i => i[2011]),
//       itemStyle: {
//         color: new echarts.graphic.LinearGradient(
//           0, 0, 1, 0,
//           [
//             {offset: 0, color: '#2034F9'},
//             {offset: 1, color: '#04A1FF'},
//           ]),
//       }
//     },
//     {
//       name: '2012年',
//       type: 'bar',
//       data: data.map(i => i[2012]),
//       itemStyle: {
//         color: new echarts.graphic.LinearGradient(
//           0, 0, 1, 0,
//           [
//             {offset: 0, color: '#B92AE8'},
//             {offset: 1, color: '#6773E7'},
//           ]),
//       }
//     },
//   ])

//   const drawCharts = (data: seriesData) => {
//     (myChart.current as ECharts)
//       .setOption(createEchartsOptions({
//         xAxis: genXAxis(),
//         yAxis: genYAxis(data),
//         series: genSeries(data),
//       }))

//   }

//   // 定时
//   useEffect(() => {
//     setInterval(() => {
//       const newData = [
//         {name: '城关区公安局', 2011: random10(), 2012: random10()},
//         {name: '七里河区公安局', 2011: random10(), 2012: random10()},
//         {name: '西固区公安局', 2011: random10(), 2012: random10()},
//         {name: '安宁区公安局', 2011: random10(), 2012: random10()},
//         {name: '红古区公安局', 2011: random10(), 2012: random10()},
//         {name: '永登县公安局', 2011: random10(), 2012: random10()},
//         {name: '皋兰县公安局', 2011: random10(), 2012: random10()},
//         {name: '榆中县公安局', 2011: random10(), 2012: random10()},
//         {name: '新区公安局', 2011: random10(), 2012: random10()},
//       ]
//       drawCharts(newData)
//     }, 3000)
//   }, [])

//   // 挂载后获取
//   useEffect(() => {
//     // 基于准备好的 dom，初始化 echarts 实例
//     myChart.current = echarts.init(divRef.current)
//     // 绘制图表
//     drawCharts(data)
//   }, [])

//   return (
//     <div className="bordered case-solving-ranking">
//       <h2>案件破获排名</h2>
//       <div ref={divRef} className="chart"/>
//       <div className="legend">
//         <span className="first"/><span className="label-text">破案排名 1</span>
//         <span className="second"/><span className="label-text">破案排名 2</span>
//       </div>
//     </div>
//   )
// }

// 车辆排放物统计
type seriesData = Array<{ name: string, CO2?: number, NOx?: number, PM2_5?: number }>;
export const Chart2 = () => {
  const divRef = useRef(null);
  const myChart = useRef<ECharts | null>(null);

  // 车辆污染物排放数据
  const data = [
    { name: '浦东新区', CO2: 50, NOx: 20, PM2_5: 10 },
    { name: '徐汇区', CO2: 60, NOx: 25, PM2_5: 15 },
    { name: '长宁区', CO2: 70, NOx: 30, PM2_5: 12 },
    { name: '静安区', CO2: 80, NOx: 35, PM2_5: 18 },
    { name: '普陀区', CO2: 65, NOx: 28, PM2_5: 14 },
  ];

  const genXAxis = () => ({
    type: 'value',
    boundaryGap: [0, 0.01],
    splitLine: { show: false },
    axisLabel: { color: '#6E7079' }, // 文字颜色
    axisLine: { lineStyle: { color: '#fff' } }, // 轴线颜色
    name: '污染物排放',
    nameTextStyle: { color: '#6E7079' }, // 轴说明文字颜色
  });

  const genYAxis = (data: seriesData) => ({
    type: 'category',
    data: data.map(i => i.name),
    axisTick: { show: false },
    axisLabel: { color: '#6E7079' }, // 文字颜色
    axisLine: { lineStyle: { color: '#fff' } }, // 轴线颜色
    name: '区域',
    nameTextStyle: { color: '#6E7079' }, // 轴说明文字颜色
  });

  const genSeries = (data: seriesData) => [
    {
      name: 'CO₂ 排放量',
      type: 'bar',
      stack: 'total', // 堆叠效果
      data: data.map(i => i.CO2),
      itemStyle: { color: '#15B8FD' }, // 颜色
      barWidth: '55%', // 这里调整柱子的宽度
    },
    {
      name: 'NOx 排放量',
      type: 'bar',
      stack: 'total',
      data: data.map(i => i.NOx),
      itemStyle: { color: '#FF5733' },
    },
    {
      name: 'PM2.5 排放量',
      type: 'bar',
      stack: 'total',
      data: data.map(i => i.PM2_5),
      itemStyle: { color: '#FFD700' },
    },
  ];

  const drawCharts = (data: seriesData) => {
    myChart.current?.setOption(
      createEchartsOptions({
        grid: {//控制表格和容器之间的距离
          left: '2%',   // 左侧内边距
          right: '26%',  // 右侧内边距
          top: '18%',    // 顶部内边距
          bottom: '3%', // 底部内边距
          containLabel: true, // 确保标签不会被裁剪
        },
        xAxis: genXAxis(),
        yAxis: genYAxis(data),
        series: genSeries(data),
        legend: {
          textStyle: { color: '#6E7079' }, // 图例颜色
        },
      })
    );
  };

  useEffect(() => {
    myChart.current = echarts.init(divRef.current);
    drawCharts(data);
  }, []);

  return (
    <div className="bordered case-solving-ranking">
      <h2>车辆污染物排放统计</h2>
      <div ref={divRef} className="chart" />
    </div>
  );
};