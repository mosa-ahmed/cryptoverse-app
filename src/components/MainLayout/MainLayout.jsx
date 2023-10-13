import React from 'react'
import {Navbar} from '../index'
import {Link} from 'react-router-dom'
import {Typography, Layout, Space} from 'antd'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
  <div className='app'>
    <div className="navbar">
      <Navbar/>
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Outlet/>
        </div>
      </Layout>
      <div className="footer">
      <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
        Cryptoverse <br/>
        All Rights Reserved
      </Typography.Title>
      <Space>
        <Link to='/'>Home</Link>
        <Link to='/exchanges'>Exchanges</Link>
        <Link to='/news'>News</Link>
      </Space>
    </div>
    </div>
  </div>
  )
}
