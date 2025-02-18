import React, {useEffect, useRef} from 'react'
import * as echarts from 'echarts'
import {createEchartsOptions} from '../../shared/create-echarts-options'
import shanghaiData from '../../geo/shanghai.json'

// 上海市地图
export const Chart6: React.FC = () => {
  const divRef = useRef(null)//useRef用于创建对DOM元素或组件实例的引用
  const colors = {
    '徐汇区': '#15B8FD',
    '浦东新区': '#06E1EE',
    '奉贤区': '#BB31F7',
  }

  useEffect(() => {

    if (!divRef.current) return;

    const myChart = echarts.init(divRef.current)//echarts.init()用于创建一个echarts实例，传入一个DOM对象作为echarts图表的容器
    // 注册地图
    // @ts-ignore
    echarts.registerMap('SHMap', shanghaiData)
    myChart.setOption(createEchartsOptions({
      xAxis: {show: false,},
      yAxis: {show: false,},
      series: [
        {
          type: 'map',//指定为地图类型
          map: 'SHMap', // 自定义扩展图表类
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
            {name: '徐汇区', value: 1},
            { name: '浦东新区', value: 50},
            {name: '奉贤区', value: 100},//value值越大，颜色越深
          ],
        },
      ],
      roam: true, // 是否开启鼠标缩放和平移漫游
      visualMap: {//让数据值映射到颜色
        min: 1,
        max: 100,
        inRange: {
          color: [colors['徐汇区'], colors['浦东新区'], colors['奉贤区']],
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
      <h2><span>上海市地图</span></h2>
      <div className="wrapper">
        <div ref={divRef} className="chart" style={{width:'100%',height:'280px', paddingLeft:'100px'}}/>
        <div className="legend bordered">
          <span className="icon" style={{background: colors['徐汇区']}}/>徐汇区
          <span className="icon" style={{ background: colors['浦东新区']}}/>浦东新区
          <span className="icon" style={{background: colors['奉贤区']}}/>奉贤区
        </div>
        <div className="notes">此地图仅显示了中国的部分区域</div>
      </div>
    </div>
  )
}
