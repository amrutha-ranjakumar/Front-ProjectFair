import React, { useEffect, useState } from 'react'
import Header from '../compontents/Header'
import { Col, Row } from 'react-bootstrap'
import Profile from '../compontents/Profile'
import MyProject from '../compontents/MyProject'

function Dashboard( ) {

  const [userName,setuserName] =useState("")
  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
     const existinguserdata= JSON.parse(sessionStorage.getItem("existinguser"));
setuserName(existinguserdata.username)
  }
  },[])

  return (
    <>
   <Header dashboard={"dashboard"} />
<h2 className='mt-5  mb-4 ms-5 '>Welcome<span style={{ color: "orange" }}> {userName}</span></h2>
<Row>
  <Col md={8} lg={8}>
  <MyProject />
  </Col>
  <Col md={4} lg={4}>
    
    <Profile />
  </Col>
</Row>
  
    </>
  )
}


export default Dashboard
