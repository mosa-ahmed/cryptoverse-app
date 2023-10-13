import { Row, Select, Col, Typography, Avatar, Card } from 'antd'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCryptosNews } from '../../services/cryptoNewsApi'
import { getCryptos } from '../../services/cryptoApi'

const {Text, Title} = Typography
const {Option} = Select

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

export default function News({simplified}) {
  const count = simplified? 6 : 12
  const dispatch = useDispatch()

  const [category, setcategory] = useState('Cryptocurrency')
  const {data:cryptoNews} = useSelector((state)=> state.news)
  const {data} = useSelector((state)=> state.cryptos)
  console.log(cryptoNews);

  useEffect(() => {
    dispatch(getCryptosNews({category,count}))
    dispatch(getCryptos(100))
  }, [])

  useEffect(() => {
    dispatch(getCryptosNews({category,count}))
    dispatch(getCryptos(100))
  }, [category])
  

  return (
    <Row gutter={[24,24]}>
      {!simplified &&
        <Col span={24}>
          <Select showSearch className='select-news' 
                  placeholder='Select a Crypto' optionFilterProp='children'
                  onChange={(value)=> setcategory(value)}
                  filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.coins?.map((coin,idx)=> <Option key={idx} value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      }

      {cryptoNews?.map((news,idx)=> 
        <Col xs={24} sm={12} lg={8} key={idx}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className="news-image-container">
                <Title className='news-title' level={4}>{news.name.length > 55?news.name.substring(0,55)+'...':news.name}</Title>
                <img style={{maxWidth:'100px',maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
              </div>
              <p>
                {news.description.length > 100 ? 
                  `${news.description.substring(0,100)}...`:
                  `${news.description}`
                }
              </p>
              <div className="provider-container">
                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}></Avatar>
                <Text style={{paddingTop:'5px'}} className='provider-name'>{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
            </a>
          </Card>
        </Col>)}
    </Row>
  )
}
