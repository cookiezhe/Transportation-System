import React from 'react'
import './Screen.scss'
import headerBg from '../../assets/header.png'
import { Chart1 } from '../../componnets/charts/chart-1'
import { Chart2 } from '../../componnets/charts/chart-2'
import { Chart3 } from '../../componnets/charts/chart-3'
import { Chart4 } from '../../componnets/charts/chart-4'
import { Chart5 } from '../../componnets/charts/chart-5'
import { Chart6 } from '../../componnets/charts/chart-6'
import { Chart7 } from '../../componnets/charts/chart-7'
import { Chart8 } from '../../componnets/charts/chart-8'
import { Chart9 } from '../../componnets/charts/chart-9'
import { Chart10 } from '../../componnets/charts/chart-10'
import { Chart11 } from '../../componnets/charts/chart-11'
import { Chart12 } from '../../componnets/charts/chart-12'
import { Chart13 } from '../../componnets/charts/chart-13'
import { Chart14 } from '../../componnets/charts/chart-14'

export const Screen = () => {
    const year = new Date().getFullYear()
    return (
        <div className="home">
            <header style={{ backgroundImage: `url(${headerBg})`}}></header>
            <main>
                <section className="section1">
                    <div className='row1 '><Chart1 /></div>
                    <div className='row2 '><Chart2 /></div>
                </section>
                {/* <section className="section2">
                    <Chart3 />
                    <Chart4 />
                </section>  */}
                {/* <section className="bordered section3">
                    <Chart5 />
                </section> */}
                <section className="section4">
                    <Chart6 />
                    <div className="bordered age-bracket">
                        <h2>犯罪人员年龄段分布</h2>
                        <div className="charts-wrapper">
                            <Chart7 />
                            <Chart9 />
                        </div>
                    </div>
                </section>
                <section className="section5">
                    {/*案发类型*/}
                    <div className="bordered row1 crime-type">
                        <h2>案发类型统计</h2>
                        <div className="charts-wrapper">
                            <Chart10 />
                            <Chart11 />
                        </div>
                    </div>
                    {/* 案发街道 */}
                    <div className="bordered row2 crime-street">
                        <h2>案发街道统计</h2>
                        <div className="charts-wrapper">
                            <Chart12 />
                            <Chart13 />
                        </div>
                    </div>
                    {/*作案手段*/}
                    {/* <div className="bordered row3 modus-operandi">
                        <h2>作案手段分析</h2>
                        <Chart14 />
                    </div> */}
                </section>
            </main>
        </div>
    )
}

export default Screen;