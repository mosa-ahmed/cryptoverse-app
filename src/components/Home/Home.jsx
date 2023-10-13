import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Typography,Row,Col,Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCryptos } from '../../services/cryptoApi'
import {Cryptocurrencies,News} from '../index'


const {Title} = Typography

export default function Home() {

  const dispatch = useDispatch()
  const {isLoading,isError,data} = useSelector((state)=> state.cryptos)
  const globalStats = data?.stats

  useEffect(() => {
    dispatch(getCryptos(10))
  }, [])
  



  // if(isLoading) return 'Loading...'

  return (<>
  <Title level={2} className='heading'>Global Crypto Stats</Title>
  <Row>
    <Col span={12}><Statistic title='Total Currencies' value={globalStats?.total}></Statistic></Col>
    <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats?.totalExchanges)}></Statistic></Col>
    <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats?.totalMarketCap)}></Statistic></Col>
    <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats?.total24hVolume)}></Statistic></Col>
    <Col span={12}><Statistic title='Total Markets' value={millify(globalStats?.totalMarkets)}></Statistic></Col>
  </Row>

  <div className="home-heading-container">
    <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
    <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
  </div>
  <Cryptocurrencies simplified/>

  <div className="home-heading-container">
    <Title level={2} className='home-title'>Latest Crypto News</Title>
    <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
  </div>
  <News simplified/>
  
    </>
  )
}
