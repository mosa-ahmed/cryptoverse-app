import React, { useEffect } from 'react'
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getExchanges } from '../../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

export default function Exchanges() {
  const dispatch = useDispatch()
  const {exchanges} = useSelector((state)=> state.cryptos)
  console.log(exchanges);

  useEffect(() => {
    dispatch(getExchanges())
  }, [])
  

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      {/* <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                {exchange.description || ''}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row> */}
    </>
  )
}
