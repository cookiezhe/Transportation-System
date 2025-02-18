import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import {createEchartsOptions} from '../../shared/create-echarts-options'
import {px} from '../../shared/px'

// MFD交通状态饼图
export const Chart11 = () => {
  const divRef = useRef(null)
  const colors = ['#F46064', '#F38E1C', '#1CDB7C', '#8D70F8', '#33A4FA'] // 颜色配置

  useEffect(() => {
    const myChart = echarts.init(divRef.current)

    myChart.setOption(createEchartsOptions({
      grid: {//控制表格和容器之间的距离
        left: '10%',   // 左侧内边距
        right: '16%',  // 右侧内边距
        top: '20%',    // 顶部内边距
        bottom: '0%', // 底部内边距
        containLabel: true, // 确保标签不会被裁剪
      },
      color: colors,
      xAxis: { show: false },
      yAxis: { show: false },
      series: [
        {
          type: 'pie',
          startAngle: -20,
          radius: ['20%', '80%'],
          avoidLabelOverlap: false,
          roseType: 'area',
          label: {
            show: true,
            color: 'inherit',
            position: 'outside',
            fontSize: px(15),
            distanceToLabelLine: 0,
            formatter(options) {
              return (options.value * 100).toFixed(1) + '%';
            }
          },
          labelLine: { show: true, length: 0 },
          itemStyle: {
            shadowBlur: px(20),
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          data: [
            { value: 0.4, name: '自由流' },  // 40%
            { value: 0.3, name: '同步流' },  // 30%
            { value: 0.2, name: '拥堵流' },  // 20%
            { value: 0.1, name: '其他' }     // 10%
          ]
        }
      ]
    }))
  }, [])

  return (
    <div className="crime-type-chart-left">
      <div className="chart">
        <div className="chart-main" ref={divRef} />
      </div>
      <div >
        <div className="legend">
          <span style={{ background: colors[0] }} /> 自由流
          <span style={{ background: colors[1] }} /> 同步流
        </div>
        <div className="legend">
          <span style={{ background: colors[2] }} /> 拥堵流
          <span style={{ background: colors[3] }} /> 其他
        </div>
      </div>
    </div>
  )
}
