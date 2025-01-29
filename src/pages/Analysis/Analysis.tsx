// src/pages/DataAnalysis.tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Row, Col, Card } from 'antd';
import './Analysis.css'

const DataAnalysis: React.FC = () => {
  // 图表 1: 交通流量柱状图（左上）
  const barChartOptions1 = {
    title: {
      text: '交通流量',
      left: 'center',
      color: 'white', // 直接设置文字颜色，移除 textStyle
      fontSize: 18,   // 标题字体大小（若需）
    },
    xAxis: {
      type: 'category',
      data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      axisLine: {
        lineStyle: {
          color: '#3398DB', // x 轴线颜色
        },
      },
      axisLabel: {
        color: 'white', // x 轴文字颜色
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#3398DB', // y 轴线颜色
        },
      },
      axisLabel: {
        color: 'white', // y 轴文字颜色
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)', // 网格线颜色
        },
      },
    },
    series: [
      {
        type: 'bar',
        data: [200, 120, 150, 80, 70, 140, 220],
        itemStyle: {
          color: '#3398DB', // 柱状图颜色
        },
        label: {
          show: true,        // 显示数据标签
          position: 'top',   // 标签位置在顶部
          color: 'white',    // 标签文字颜色
        },
      },
    ],
    grid: {
      left: '10%',
      right: '8%',
      top: '20%',
      bottom: '12%',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
  };

  // 图表 2: 交通事故类型分析饼图（左下）
  const pieChartOptions = {
    title: {
      text: '交通事故类型分析',
      left: 'center',
      color: 'white', // 直接设置标题文字颜色
      fontSize: 18,   // 可选：标题字体大小
    },
    tooltip: {
      trigger: 'item',
      color: 'white', // 直接设置提示框文字颜色
    },
    legend: {
      orient: 'horizontal', // 设置图例为水平布局
      bottom: '0%',         // 图例位置在底部
      left: 'center',       // 图例居中
      color: 'white',       // 设置图例文字颜色
      fontSize: 12,         // 可选：图例文字字体大小
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        label: {
          show: true,
          formatter: '{b}: {d}%', // 显示数据标签和百分比
          color: 'white',         // 数据标签文字颜色
        },
        data: [
          { value: 8, name: '单车事故' },
          { value: 7, name: '其他事故' },
          { value: 15, name: '侧翻事故' },
          { value: 10, name: '刮擦事故' },
          { value: 35, name: '碰撞事故' },
          { value: 25, name: '追尾事故' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)', // 高亮阴影效果
          },
        },
      },
    ],
  };

  // 图表4：各城区车速情况（柱状图-右上）
  const districtSpeedChartOptions = {
    title: {
      text: '各城区车速情况（早高峰 vs 晚高峰）',
      left: 'center',
      color: 'white', // 设置标题文字颜色
      fontSize: 16,   // 可选：设置标题字体大小
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow', // 使用阴影指示器
      },
    },
    legend: {
      data: ['早高峰', '晚高峰'],
      top: '10%', // 图例在顶部显示
      color: 'white', // 设置图例文字颜色
      fontSize: 12,   // 可选：设置图例字体大小
    },
    xAxis: {
      type: 'category',
      data: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区'], // 上海市的城区
      axisLine: {
        lineStyle: {
          color: '#FF9F7F', // 设置 x 轴轴线颜色
        },
      },
      axisLabel: {
        color: 'white', // 设置 x 轴标签文字颜色
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true, // 确保显示轴线
        lineStyle: {
          color: '#FF9F7F', // 设置 y 轴轴线颜色
        },
      },
      axisLabel: {
        color: 'white', // 设置 y 轴标签文字颜色
      },
    },
    series: [
      {
        name: '早高峰',
        type: 'bar',
        data: [25, 28, 22, 30, 27, 24], // 每个城区的早高峰静态车速数据
        itemStyle: {
          color: '#3398DB', // 早高峰的柱状颜色
        },
      },
      {
        name: '晚高峰',
        type: 'bar',
        data: [22, 26, 20, 28, 25, 22], // 每个城区的晚高峰静态车速数据
        itemStyle: {
          color: '#FF9F7F', // 晚高峰的柱状颜色
        },
      },
    ],
    grid: {
      left: '10%',   // 左边距
      right: '8%',   // 右边距
      top: '28%',    // 上边距
      bottom: '10%', // 下边距
    },
  };

  // 图表5：MFD曲线（折线图）
  const MFDChartOptions = {
    title: {
      text: 'MFD曲线',
      left: 'center',
      color: 'white', // 设置标题颜色
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#5470C6', // 设置 x 轴线颜色
        },
      },
      axisLabel: {
        color: 'white', // 设置 x 轴文字颜色
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%'],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#5470C6', // 设置 y 轴线颜色
        },
      },
      axisLabel: {
        color: 'white', // 设置 y 轴文字颜色
      },
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gt: 1,
          lt: 3,
          color: 'rgba(0, 0, 180, 0.4)',
        },
        {
          gt: 5,
          lt: 7,
          color: 'rgba(0, 0, 180, 0.4)',
        },
      ],
    },
    series: [
      {
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: '#5470C6',
          width: 5,
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
        },
        areaStyle: {},
        data: [
          ['3:00', 200],
          ['5:30', 560],
          ['8:00', 750],
          ['10:30', 580],
          ['13:00', 250],
          ['15:30', 300],
          ['18:00', 700],
          ['20:30', 300],
          ['23:00', 100],
        ],
      },
    ],
    grid: {
      left: '10%',
      right: '8%',
      top: '18%',
      bottom: '10%',
    },
  };

  const radarChartOptions = {
    title: {
      text: '上海市各区拥堵情况',
      left: 'center',
      color: 'white', // 设置标题颜色
    },
    tooltip: {
      trigger: 'item',
    },
    radar: {
      indicator: [
        { name: '浦东新区', max: 100 },
        { name: '徐汇区', max: 100 },
        { name: '黄浦区', max: 100 },
        { name: '静安区', max: 100 },
        { name: '长宁区', max: 100 },
        { name: '虹口区', max: 100 },
      ],
      center: ['50%', '60%'],
      radius: '60%',
      splitLine: {
        lineStyle: {
          color: '#3398DB',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#3398DB',
        },
      },
      axisName: {
        color: 'white', // 雷达图指示器标签的颜色
      },
    },
    series: [
      {
        name: '拥堵情况',
        type: 'radar',
        data: [
          {
            value: [80, 70, 65, 75, 50, 60],
            name: '拥堵指数',
          },
        ],
        itemStyle: {
          color: '#3398DB',
        },
        areaStyle: {
          color: 'rgba(51, 152, 219, 0.5)',
        },
        lineStyle: {
          color: '#3398DB',
        },
      },
    ],
  };


  // 仪表盘车速
  const speedChartOptions = {
    title: {
      text: '行车速度',
      left: 'center',
      color: 'white', // 设置标题颜色
    },
    tooltip: {
      formatter: '{a} <br/>{b} : {c} km/h',
    },
    series: [
      {
        name: '最低速度',
        type: 'gauge',
        center: ['20%', '55%'],
        radius: '52.5%',
        startAngle: -120,
        endAngle: 30,
        min: 0,
        max: 120,
        axisTick: { show: false },
        axisLabel: {
          distance: 13,
          color: '#37a2da',
          fontSize: 7,
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, '#37a2da'],
              [0.7, '#37a2da'],
              [1, '#37a2da'],
            ],
          },
        },
        splitLine: {
          distance: 0,
          length: 5,
          lineStyle: {
            width: 2,
            color: '#37a2da',
          },
        },
        pointer: {
          width: 5,
          length: '50%',
          color: '#37a2da',
        },
        detail: {
          formatter: (value:any) => `${value} km/h`,
          fontSize: 12,
          offsetCenter: ['10%', '50%'],
          color: 'white',
        },
        data: [{ value: 15, name: '最低速度' }],
      },
      {
        name: '平均速度',
        type: 'gauge',
        center: ['50%', '55%'], // 设置第二个仪表盘位置
        radius: '60%',
        min: 0,
        max: 120,
        // 仪表盘是否显示精确标志
        axisTick: {
          show: false
        },
        // 设置速度显示的颜色和字体大小
        axisLabel: {
          distance: 13,
          color: '#67e0e3',
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, '#67e0e3'], // 最低速度区段的颜色
              [0.7, '#67e0e3'], // 中等速度区段的颜色
              [1, '#67e0e3'], // 高速区段的颜色
            ],
          },
        },
        // 设置大刻度线
        splitLine: {
          distance: 0, // 让大刻度线紧贴仪表盘
          length: 5,
          lineStyle: {
            width: 2,
            color: '#67e0e3'
          }
        },
        // 指示针相关
        pointer: {
          width: 5,
          length: '50%',
          itemStyle: {
            color: '#67e0e3'
          }
        },
        detail: {
          formatter: '{value} km/h',
          fontSize: 15, // 调整数据字体大小
          color: 'white',
        },
        data: [{ value: 31.6, name: '平均速度' }],
      },
      {
        name: '最高速度',
        type: 'gauge',
        center: ['80%', '55%'], // 设置第三个仪表盘位置
        radius: '52.5%',
        startAngle: 150, // 设置起始角度为 180°，表示从底部开始
        endAngle: -60,     // 结束角度为 0°，表示到顶部结束（形成半圆）
        min: 0,
        max: 120,
        // 仪表盘是否显示精确标志
        axisTick: {
          show: false
        },
        // 设置速度显示的颜色和字体大小
        axisLabel: {
          distance: 13,
          color: '#9a60b4',
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, '#9a60b4'], // 最低速度区段的颜色
              [0.7, '#9a60b4'], // 中等速度区段的颜色
              [1, '#9a60b4'], // 高速区段的颜色
            ],
          },
        },
        // 设置大刻度线的长度和颜色
        splitLine: {
          distance: 0, // 让大刻度线紧贴仪表盘
          length: 5,
          lineStyle: {
            width: 2,
            color: '#9a60b4'
          }
        },
        // 指示针相关
        pointer: {
          width: 5,
          length: '50%',
          itemStyle: {
            color: '#9a60b4'
          }
        },
        detail: {
          formatter: '{value} km/h',
          fontSize: 12, // 调整数据字体大小
          offsetCenter: ['-18%', '50%'], // 调整数据显示的位置
          color: 'white',
        },
        data: [{ value: 83.0, name: '最高速度' }],
      },
    ],
  };


  // 根据图片布局，使用 `Row` 和 `Col` 进行布局
  return (
    <div className="data-analysis-container">
      <Row gutter={16}>
        {/* 第一行 */}
        <Col span={8}>
          <Card className='analysis_card'>
            <ReactECharts option={barChartOptions1} style={{ height: '210px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className='analysis_card'>
            <ReactECharts option={speedChartOptions} style={{ height: '210px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className='analysis_card'>
            <ReactECharts option={districtSpeedChartOptions} style={{ height: '210px' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '10px' }}>
        {/* 第二行 */}
        <Col span={8}>
          <Card className='analysis_card'>
            <ReactECharts option={pieChartOptions} style={{ height: '210px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className='analysis_card'>
            <ReactECharts option={radarChartOptions} style={{ height: '210px' }} />
          </Card>
        </Col>
        <Col span={8}>
          <Card className='analysis_card'>
            <ReactECharts option={MFDChartOptions} style={{ height: '210px' }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataAnalysis;
