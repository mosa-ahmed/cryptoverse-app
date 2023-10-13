import React, { useEffect, useState } from 'react'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Select, Typography } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCoin, getCoinHistory } from '../../services/cryptoApi'
import LineChart from '../LineChart/LineChart'

const {Title, Text} = Typography
const {Option} = Select

export default function CryptoDetails() {
  const {coinId} = useParams()
  const dispatch = useDispatch()
  const {coin:{coin}} = useSelector((state)=> state.cryptos)
  const {history:coinHistory} = useSelector((state)=> state.cryptos)
  const [timePeriod, settimePeriod] = useState('5y')
  console.log(coin);
  console.log(coinHistory);
  console.log(timePeriod);

  const time = ['3h', '24h', '7d', '3d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${coin?.price && millify(coin?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: coin?.rank, icon: <NumberOutlined/> },
    { title: '24h Volume', value: `$ ${coin && millify(coin['24hVolume'])}`, icon: <ThunderboltOutlined/> },
    { title: 'Market Cap', value: `$ ${coin?.marketCap && millify(coin?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(coin?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: coin?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: coin?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: coin?.supply?.confirmed ? <CheckOutlined/> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${millify(coin?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(coin?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ]

  useEffect(() => {
    dispatch(getCoin(coinId))
    dispatch(getCoinHistory({coinId,timePeriod}))
  }, [])

  useEffect(() => {
    dispatch(getCoinHistory({coinId,timePeriod}))
  }, [timePeriod])
  

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title className='coin-name' level={2}>
          {coin?.name} ({coin?.slug}) Price
        </Title>
        <p>{coin?.name} live price in US dollars.
            view value statistics, market cap and supply</p>
      </Col>
      <Select defaultValue='7d' className='select-timeperiod' 
              placeholder='Select Time Period' onChange={(value)=> settimePeriod(value)}>
            
          {time.map((date)=> <Option key={date} value={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(coin?.price)} coinName={coin?.name}/>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {coin?.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {coin?.name}</p>
          </Col>
          {stats.map(({icon,title,value})=> 
            <Col key={title} className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>)}
        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>An overview showing the stats of all Cryptocurrencies</p>
          </Col>
          {genericStats.map(({icon,title,value})=> 
            <Col key={title} className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>)}
        </Col>
      </Col>

      <Col className='coin-desc-link'>
        <Col className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {coin?.name}? <br />
          </Title>
          <Text>{coin?.description}</Text>
        </Col>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {coin?.name} Links
          </Title>
          {coin?.links.map((link)=> 
            <Row className='coin-link' key={link.name}>
              <Title level={3} className='link-name'>{link.type}</Title>
              <a href={link.url} target='_blank' rel='noreferrer'>{link.name}</a>
            </Row>)}
        </Col>
      </Col>
    </Col>
  )
}
