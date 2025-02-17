import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import {createEchartsOptions} from '../../shared/create-echarts-options'
import chinaData from '../../geo/china.json'

// 全市犯罪人员籍贯分布地
export const Chart6: React.FC = () => {
  const divRef = useRef(null)//useRef用于创建对DOM元素或组件实例的引用
  const colors = {
    '甘肃省': '#15B8FD',
    '四川省': '#06E1EE',
    '青海省': '#BB31F7',
  }

  useEffect(() => {

    if (!divRef.current) return;

    const myChart = echarts.init(divRef.current)//echarts.init()用于创建一个echarts实例，传入一个DOM对象作为echarts图表的容器
    // 注册地图
    // @ts-ignore
    echarts.registerMap('CNMap', chinaData)
    myChart.setOption(createEchartsOptions({
      xAxis: {show: false,},
      yAxis: {show: false,},
      series: [
        {
          type: 'map',//指定为地图类型
          map: 'CNMap', // 自定义扩展图表类
          label: {show: false, color: 'white'},
          emphasis: {//鼠标悬浮时高亮显示
            label: {color: 'white'},//悬浮时的文字颜色
            areaColor: '#5470C6',//悬浮颜色
          },
          itemStyle: {
            areaColor: '#010D3D',//默认地图背景色
            borderColor: '#01A7F7',//省份边界颜色
          },
          //关联数据
          data: [
            {name: '甘肃省', value: 1},
            {name: '四川省', value: 50},
            {name: '青海省', value: 100},//value值越大，颜色越深
          ],
        },
      ],
      roam: false, // 是否开启鼠标缩放和平移漫游
      visualMap: {//让数据值映射到颜色
        min: 1,
        max: 100,
        inRange: {
          color: [colors['甘肃省'], colors['四川省'], colors['青海省']],
        },
        show: false,
      },

    }))

    // 监听窗口大小变化，强制 ECharts 重绘
    window.addEventListener('resize', () => myChart.resize());

    return () => {
      window.removeEventListener('resize', () => myChart.resize());
      myChart.dispose(); // 组件卸载时销毁 ECharts 实例
    };

  }, [])


  return (
    <div className="bordered native-place">
      <h2><span>全市犯罪人员籍贯分布地</span></h2>
      <div className="wrapper">
        <div ref={divRef} className="chart" style={{width:'100%',height:'280px'}}/>
        <div className="legend bordered">
          <span className="icon" style={{background: colors['甘肃省']}}/>甘肃籍
          <span className="icon" style={{background: colors['四川省']}}/>四川籍
          <span className="icon" style={{background: colors['青海省']}}/>青海籍
        </div>
        <div className="notes">此地图仅显示了中国的部分区域</div>
      </div>
    </div>
  )
}
