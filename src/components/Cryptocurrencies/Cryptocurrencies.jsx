import { Card , Row, Input, Col} from 'antd'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCryptos } from '../../services/cryptoApi'

export default function Cryptocurrencies({simplified}) {
  const count = simplified? 10 : 100

  const dispatch = useDispatch()
  const [searchTerm, setsearchTerm] = useState('')
  const {isLoading,isError,data} = useSelector((state)=> state.cryptos)
  var cryptosList = data?.coins
  console.log(cryptosList);
  const [cryptos, setcryptos] = useState([])
  console.log(cryptos);
 

  useEffect(() => { 
    const filteredData = cryptosList?.filter((coin)=> coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setcryptos(filteredData)
    console.log(cryptosList);
  }, [searchTerm,cryptosList])


  useEffect(() => {
    dispatch(getCryptos(count))
  }, [])
  
  
  return (
    <>
    {!simplified && 
      <div className="search-crypto">
        <Input placeholder='Search Cryptocurrency' onChange={(e)=> setsearchTerm(e.target.value)}/>
      </div>
    }

    <Row gutter={[32,32]} className='crypto-card-container'>
      {cryptos?.map((currency)=> 
      <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
        <Link to={`/crypto/${currency.uuid}`}>
          <Card title={`${currency?.rank}. ${currency?.name}`}
                extra={<img className='crypto-image' src={currency?.iconUrl} alt=''/>}
                hoverable>
                <p>Price: {millify(currency?.price)}</p>
                <p>Market Cap: {millify(currency?.marketCap)}</p>
                <p>Daily Change: {millify(currency?.change)}%</p>
          </Card>
        </Link>
      </Col>)}
    </Row>
    </>
  )
}
