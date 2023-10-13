import { Typography, Col, Row } from 'antd'
import React from 'react'
import { Line } from 'react-chartjs-2'
import {registerables, Chart} from 'chart.js'

const {Title} = Typography


export default function LineChart({coinHistory, currentPrice, coinName}) {
  const coinPrice = []
  const coinTimestamp = []

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price)
    coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString())
  }

  console.log(coinTimestamp);

  Chart.register(...registerables);
  const data = {
    labels:coinTimestamp,
    datasets:[
      {label:'Price in USD',
       data:coinPrice,
       fill:false,
       backgroundColor:'#0071bd'
      }
    ]
  }

  const options={
    scales:{
      yAxes:[
        {
          ticks:{
            beginAtZero:true
          }
        }
      ]
    }
  }

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
        <Col className='price-container'>
          <Title className='price-change' level={5}>{coinHistory?.data?.change}%</Title>
          <Title className='current-price' level={5}>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>

      <Line data={data} options={options}></Line>
    </>
  )
}
