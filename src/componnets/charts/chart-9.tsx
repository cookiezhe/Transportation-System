import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import {createEchartsOptions} from '../../shared/create-echarts-options'
import {px} from '../../shared/px'

// 犯罪人员年龄段分布 犯罪年龄趋势图
// export const Chart9 = () => {
//   const divRef = useRef(null)
//   useEffect(() => {
//     const myChart = echarts.init(divRef.current)
//     myChart.setOption(createEchartsOptions({
//       color: '#F7A110',
//       xAxis: {
//         type: 'category',
//         boundaryGap: false,
//         data: [0, 18, 28, 38, 48, 58, 68, 78],
//         splitLine: {show: true, lineStyle: {color: '#073E78'}},
//         axisTick: {show: false},
//         axisLine: {show: false},
//       },
//       yAxis: {
//         type: 'value',
//         splitLine: {lineStyle: {color: '#073E78'}},
//         axisLabel: {
//           formatter(val) {
//             return val * 100 + '%'
//           }
//         }
//       },
//       series: [{
//         type: 'line',
//         data: [
//           0.19, 0.20, 0.26,
//           0.35, 0.26, 0.20,
//           0.08, 0.06
//         ],
//         symbol: 'circle',
//         symbolSize: px(12),
//         lineStyle: {width: px(2)},
//         areaStyle: {
//           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//             offset: 0,
//             color: '#F7A110'
//           }, {
//             offset: 1,
//             color: '#1B1D52'
//           }]),
//         }
//       }]
//     }))
//   }, [])

//   return (
//     <div className="age-bracket-chart-right">
//       <div ref={divRef} className="chart"></div>
//     </div>
//   )
// }
export const Chart9 = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    const data = [
      { month: '1月', 公交: 45, 自驾: 30, 其他: 25 },
      { month: '2月', 公交: 42, 自驾: 32, 其他: 26 },
      { month: '3月', 公交: 38, 自驾: 35, 其他: 27 },
      { month: '4月', 公交: 35, 自驾: 40, 其他: 25 },
      { month: '5月', 公交: 33, 自驾: 42, 其他: 25 },
      { month: '6月', 公交: 30, 自驾: 45, 其他: 25 },
      { month: '7月', 公交: 28, 自驾: 48, 其他: 24 },
      { month: '8月', 公交: 25, 自驾: 50, 其他: 25 },
      { month: '9月', 公交: 27, 自驾: 48, 其他: 25 },
      { month: '10月', 公交: 30, 自驾: 45, 其他: 25 },
      { month: '11月', 公交: 35, 自驾: 42, 其他: 23 },
      { month: '12月', 公交: 40, 自驾: 38, 其他: 22 },
    ];

    const option: echarts.EChartsOption = {
      grid: {
        top: '12%',    // 顶部边距
        left: '8%',    // 左侧边距
        right: '4%',   // 右侧边距
        bottom: '20%', // 底部边距（为旋转的X轴标签留空间）
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.month),
        axisLabel: {
          rotate: 60,      // 标签旋转60度避免重叠
          fontSize: 9,     // 缩小字体
          margin: 2,       // 减少标签间距
        },
        axisLine: { show: false },  // 隐藏轴线
        axisTick: { show: false },   // 隐藏刻度线
      },
      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 9 }, // 缩小字体
        splitLine: { show: false },  // 隐藏网格线
        axisLine: { show: false },   // 隐藏轴线
        axisTick: { show: false },   // 隐藏刻度线
        min: 0,
        max: 60,
      },
      series: [
        {
          name: '公交',
          type: 'line',
          data: data.map((item) => item.公交),
          symbol: 'circle',
          symbolSize: 4,        // 更小的数据点
          lineStyle: { width: 1.5 }, // 更细的线条
          smooth: true,        // 平滑曲线
        },
        {
          name: '自驾',
          type: 'line',
          data: data.map((item) => item.自驾),
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: { width: 1.5 },
          smooth: true,
        },
        {
          name: '其他',
          type: 'line',
          data: data.map((item) => item.其他),
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: { width: 1.5 },
          smooth: true,
        },
      ],
      legend: {
        top: '0%',           // 图例紧贴顶部
        itemWidth: 10,       // 缩小图例图标
        itemHeight: 6,
        textStyle: { fontSize: 12 }, // 缩小字体
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const [bus, car, other] = params;
          return `
            ${bus.axisValue}<br>
            ${bus.marker} ${bus.seriesName}: ${bus.data}%<br>
            ${car.marker} ${car.seriesName}: ${car.data}%<br>
            ${other.marker} ${other.seriesName}: ${other.data}%
          `;
        },
      },
    };

    chart.setOption(option);
    return () => chart.dispose();
  }, []);

  return <div ref={chartRef} style={{ width: '300px', height: '150px' }} />;
};