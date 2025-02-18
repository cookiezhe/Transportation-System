import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import {createEchartsOptions} from '../../shared/create-echarts-options'

// 案发类型统计 条形图
// export const Chart10 = () => {
//   const divRef = useRef(null)
//   useEffect(() => {
//     const myChart = echarts.init(divRef.current)

//     myChart.setOption(createEchartsOptions({
//       xAxis: {
//         data: ['入室抢劫', '当街偷盗', '团伙诈骗', '刑事案件', '民事案件'],
//         axisTick: {show: false},
//         axisLine: {
//           lineStyle: {color: '#083B70'}
//         },
//         axisLabel: {
//           formatter(val) {
//             if (val.length > 2) {
//               const array = val.split('')
//               array.splice(2, 0, '\n')
//               return array.join('')
//             } else {
//               return val
//             }
//           }
//         },
//       },
//       yAxis: {
//         splitLine: {show: false},
//         axisLine: {
//           show: true,
//           lineStyle: {color: '#083B70'}
//         }
//       },
//       series: [{
//         type: 'bar',
//         data: [40, 22, 20, 18, 32],
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//           offset: 0,
//           color: '#0A97FB'
//         }, {
//           offset: 1,
//           color: '#1E34FA'
//         }]),
//       }],
//     }))
//   }, [])

//   return (
//     <div className="crime-type-chart-left">
//       <div ref={divRef} className="chart"></div>
//     </div>
//   )
// }

export const Chart10 = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const myChart = echarts.init(divRef.current);

    const mfdData = [
      { name: '黄浦区', flow: 1200, speed: 30 },
      { name: '徐汇区', flow: 1800, speed: 25 },
      { name: '长宁区', flow: 1500, speed: 28 },
      { name: '静安区', flow: 2100, speed: 20 },
      { name: '普陀区', flow: 1700, speed: 24 },
      { name: '虹口区', flow: 1300, speed: 29 },
      { name: '杨浦区', flow: 1600, speed: 27 },
      { name: '闵行区', flow: 1900, speed: 22 },
      { name: '宝山区', flow: 1400, speed: 26 },
      { name: '嘉定区', flow: 2000, speed: 19 },
      { name: '浦东新区', flow: 2500, speed: 18 },
      { name: '金山区', flow: 1000, speed: 35 },
      { name: '松江区', flow: 1100, speed: 34 },
      { name: '青浦区', flow: 900, speed: 36 },
      { name: '奉贤区', flow: 950, speed: 33 },
      { name: '崇明区', flow: 700, speed: 40 },
    ];

    myChart.setOption(createEchartsOptions({
      grid: {//控制表格和容器之间的距离
        left: '6%',   // 左侧内边距
        right: '16%',  // 右侧内边距
        top: '20%',    // 顶部内边距
        bottom: '0%', // 底部内边距
        containLabel: true, // 确保标签不会被裁剪
      },
      xAxis: {
        name: '流量',
        type: 'value',
        nameGap: 5,  // 让名称更靠近 X 轴
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#083B70' } },
        axisLabel: {
          show: true,
          formatter: (value: string, index: number) => {
            return index % 2 === 0 ? value : '';  // 仅偶数索引显示
          }
        }
      },
      yAxis: {
        name: '速度 (km/h)',
        type: 'value',
        splitLine: { show: false },
        axisLine: { lineStyle: { color: '#083B70' } },
      },
      series: [{
        type: 'scatter',
        data: mfdData.map(item => [item.flow, item.speed]),
        symbolSize: 10,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0A97FB' },
            { offset: 1, color: '#1E34FA' }
          ]),
          borderColor: '#fff',
          borderWidth: 1
        }
      }],
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => `${mfdData[params.dataIndex].name}<br>流量: ${params.data[0]} 辆/小时<br>速度: ${params.data[1]} km/h`
      }
    }));

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div className="crime-type-chart-left">
      <div ref={divRef} className="chart"></div>
    </div>
  );
};