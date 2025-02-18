import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import type  {EChartsOption, ECharts} from 'echarts'
import {px} from '../../shared/px'
import {createEchartsOptions} from '../../shared/create-echarts-options'
import shanghaiData from '../../geo/shanghai.json'

// // 案发派出所管辖统计
// export const Chart1: React.FC = () => {
//   // 获取节点
//   const divRef = useRef<HTMLDivElement>(null)
//   const myChart = useRef(null)
//   const data = [
//     {name: '兰州新区', value: 10},
//     {name: '兰州新区', value: 20},
//     {name: '兰州新区', value: 36},
//     {name: '兰州新区', value: 41},
//     {name: '兰州新区', value: 15},
//     {name: '兰州新区', value: 26},
//     {name: '兰州新区', value: 37},
//     {name: '兰州新区', value: 18},
//     {name: '兰州新区', value: 29},
//   ]

//   // 挂载后获取
//   useEffect(() => {
//     // 基于准备好的 dom，初始化 echarts 实例
//     myChart.current = echarts.init(divRef.current)

//     // 图表选项
//     const options: EChartsOption = {
//       xAxis: {
//         data: data.map(item => item.name),
//         axisTick: {show: false}, // 刻度线
//         // 轴线
//         axisLine: {lineStyle: {color: '#083B70'}},
//         // 刻度标签
//         axisLabel: {
//           // 文字内容格式器
//           formatter(val: string) {
//             // return val.split('').join('\n') // 一列
//             if (val.length > 2) {
//               const arr = val.split('')
//               arr.splice(2, 0, '\n')
//               return arr.join('')
//             } else {
//               return val
//             }
//           },
//         },
//       },
//       yAxis: {
//         // grid 网格区域分隔线
//         splitLine: {show: false},
//         axisLine: {
//           lineStyle: {color: '#083B70'},
//         },
//         axisLabel: {
//           fontSize: px(12),
//         },
//       },
//       // 实际数据
//       series: [
//         {
//           type: 'bar',
//           data: data.map(item => item.value),
//         },
//       ],
//     }

//     // 绘制图表
//     ;(myChart.current as ECharts).setOption(createEchartsOptions(options))

//   }, [])

//   return (
//     <div className="bordered jurisdictional-statistics">
//       <h2>案发派出所管辖统计</h2>
//       <div ref={divRef} className="chart"></div>
//     </div>
//   )
// }




export const Chart1: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts | null>(null);
  // 模拟数据
  const trafficData = [
    { name: '浦东新区', flow: 1200, congestion: 80 },
    { name: '徐汇区', flow: 800, congestion: 60 },
    { name: '长宁区', flow: 600, congestion: 40 },
    { name: '黄浦区', flow: 1000, congestion: 70 },
    { name: '静安区', flow: 500, congestion: 30 },
  ];

  useEffect(() => {
    if (!divRef.current) return;
    myChart.current = echarts.init(divRef.current);

    // 图表选项
    const option = {
      tooltip: { trigger: 'axis' },//鼠标悬停时显示数据详情
      // legend: { data: ['道路流量（车辆/小时）', '拥堵指数'], top: '10%', textStyle: { color: '#fff' } },
      grid: { left: '8%', right: '8%', bottom: '2%', top:'-8%', containLabel: true },//控制图标内边距，防止数据溢出或者过于紧凑
      xAxis: {//设置x轴，参数分别是类目轴、分类数据、轴标签颜色、轴线颜色
        type: 'category',
        data: trafficData.map(item => item.name),
        axisLabel: { color: '#6E7079' },
        axisLine: { lineStyle: { color: '#083B70' } },
      },
      yAxis: [//设置y轴
        {
          type: 'value',
          name: '车辆流量（辆/小时）',
          position: 'left',
          axisLabel: { color: '#6E7079' },
          splitLine: { show: false },
        },
        {
          type: 'value',
          name: '拥堵指数',
          position: 'right',
          axisLabel: { color: '#6E7079' },
          axisLine: { lineStyle: { color: '#083B70' } },
          splitLine: { show: false },
          max: 100, // 拥堵指数范围 0~100
        },
      ],
      series: [
        {
          name: '道路流量（车辆/小时）',
          type: 'bar',
          data: trafficData.map(item => item.flow),
          itemStyle: { color: '#083B70' },
          barWidth: '50%', // 这里调整柱子的宽度
        },
        {
          name: '拥堵指数',
          type: 'line',
          yAxisIndex: 1, // 绑定右侧 Y 轴
          data: trafficData.map(item => item.congestion),
          itemStyle: { color: '#FF5733' },
          lineStyle: { width: 2 },
          smooth: true, // 平滑曲线
        },
      ],
    };

    myChart.current.setOption(option);

    return () => myChart.current?.dispose(); // 组件卸载时销毁实例
  }, []);

  return (
    <div className="bordered jurisdictional-statistics">
      <h2>上海道路流量 & 拥堵指数</h2>
      <div ref={divRef} className="chart" style={{height:'100%'}}/>
    </div>
  );
};
