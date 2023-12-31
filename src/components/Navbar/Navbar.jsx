import React, { useEffect, useState } from 'react'
import {Typography, Avatar, Menu} from 'antd'
import {Link} from 'react-router-dom'
import {HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined,MenuOutlined} from '@ant-design/icons'

import icon from '../../imgs/cryptocurrency.png'

export default function Navbar() {
  const [activeMenu, setactiveMenu] = useState(true)
  const [screenSize, setscreenSize] = useState(null)

  useEffect(() => {
    const handleResize = ()=> setscreenSize(window.innerWidth)

    window.addEventListener('resize',handleResize)

    handleResize()
  
    return () => window.removeEventListener('resize',handleResize)
  }, [])
  
  useEffect(() => {
  if(screenSize<768){
    setactiveMenu(false)
  }else{setactiveMenu(true)}
  }, [screenSize])
  

  return (
    <div className='nav-container'>
      <div className="logo-container">
        <Avatar src={icon}/>
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
        <button className='menu-control-container' onClick={()=> setactiveMenu(!activeMenu)}>
          <MenuOutlined/>
        </button>
      </div>
      {activeMenu &&  <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined/>}>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined/>}>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>
          {/* <Menu.Item icon={<MoneyCollectOutlined/>}>
            <Link to='/exchanges'>Exchanges</Link>
          </Menu.Item> */}
          <Menu.Item icon={<BulbOutlined/>}>
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>}

    </div>
  )
}
