import React, { useEffect, useState } from 'react'
import Header from '../compontents/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../compontents/ProjectCard'
import { allProjectAPI} from '../services/allAPI'
import { Link } from 'react-router-dom'

function Project() {
  const [isToken,setisToken]=useState(false)
  const [searchKey, setsearchKey]=useState("")
  const [allproject,setAllproject]=useState([])
  const getAllproject  = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey,reqHeader);
      console.log("result for all project");
      console.log(result);
      setAllproject(result.data)
    }
  }
  useEffect(()=>{
    getAllproject();


  },[searchKey])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
setisToken(true)
    }
  })
  console.log("==============searchkey",searchKey);

  return (
    <>
      <Header />
      <div className='d-flex justify-content-center flex-column align-items-center mt-5'>
        <h2>All Project</h2>
        <div className='mt-5 w-25 d-flex'>
          <input type="text" className='form-control' placeholder='search project using technology'
          onChange={(e)=>setsearchKey(e.target.value)}
          
          />
          <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{ marginLeft: "-45px" }}></i>
        </div>
      </div>
      <Row className='m-5' >
        {

         allproject?.length>0?
         allproject.map((item)=>(
          <Col sm={12} lg={4} md={4}>
          <ProjectCard  project={item} />
        </Col>
         )) :
         <div>

          {
            isToken?
            
            <p>no projects uploaded yet</p>:
            <div className='d-flex justify-content align-items-center flex-column  '>
              <img src="https://www.freeiconspng.com/thumbs/login-icon/client-login-icon-4.gif" alt="" height={"300px"} width={"300px"}/>
              <p className='text-danger fs-4'>please<Link style={{textDecoration:"none"}} to={'/login'}> login </Link>to view projects</p>
            </div>

          }
         </div>
       
        
        }
      </Row>
    </>

  )
}

export default Project
