import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import HomeImage from '../assets/image1.jpg'
import ProjectCard from '../compontents/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'
function Home() {
  const [homeProject,setHomeProject]= useState([])

  const [isloggedIn, setisLoggedIn] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setisLoggedIn(true)
    }
  }, [])
  const getHomeProject = async()=>{
    const result = await homeProjectAPI();
    console.log(result);
    setHomeProject(result.data)
  }
  useEffect(()=>{
    getHomeProject();
  },[])
  return (
    <>
      <div className='mb-5 bg-success' style={{ width: "100%", height: "80vh" }}>
        <div className='container-fluid rounded' >
          <Row className='align-items-center p-5'>
            <Col sm={12} md={6} lg={6}>
              <h1 className='text-light mb-3' style={{ fontSize: '70px', fontWeight: "600" }}>Projectfair</h1>
              <p>one stop destination for all web application project</p>
              {
                isloggedIn ?
                  <Link to={'/dashboard'}>
                    <button className='btn btn-warning rounded'>Manage Projects</button>
                  </Link>
                  :
                   <Link to={'/login'}>
                    <button className='btn btn-warning rounded'>Get Started</button>
                  </Link>
              }

            </Col>
            <Col sm={12} lg={6} md={6}>
              <img src={HomeImage} alt="" height={"450px"}
                style={{ marginTop: "50px" }} />
            </Col>

          </Row>
        </div>

      </div>

      <div className='mt-5 all-project'>
        <div className='text-center'>
          <h1>Explore my project</h1>
          <marquee scrollAmound={50}>


            <div className='d-flex mt-5  mb-5'>
              {
                homeProject?.length>0?
                homeProject.map((item)=>(
                  <div className='ms-5' style={{ width: "400px" }}>
                  <ProjectCard  project={item}/>
                </div>

                )):
                <p>No projects to load</p>
              }
             

            </div>
          </marquee>
          <div className='text-center mt-5 mb-3'>
            <h6><Link to={'/project'}>See more project</Link></h6>

          </div>
        </div>
      </div>
    </>



  )
}

export default Home