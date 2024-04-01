import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import authImage from '../assets/image2.jpg'
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';



function Auth({ register }) {
   const {isAuthToken, setisAuthToken}=useContext(isAuthTokenContext)

  const registerForm = register ? true : false;
  const navigate = useNavigate()

  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(userData);
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      alert("please fill the form completely")
    }
    else {
      const result = await registerAPI(userData);
      console.log(result);
      if (result.status === 200) {
        alert("user Registered successfully")
        setuserData({
          username: "",
          email: "",
          password: ""

        })
        navigate('/login')
      }
      else {
        alert(result.response.data)

      }

    }
  }
  const handlelogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      alert("please fill the form completely")
    }
    else {
      const result = await loginAPI(userData);

      if (result.status === 200) {
        console.log(result);
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existinguser));
        sessionStorage.setItem("token", result.data.token);
        setisAuthToken(true)
       alert("user logged in successfully")

        setuserData({
          username: "",
          email: "",
          password: ""
        })
        navigate('/')
      }
      else{
        alert(result.response.data)
      }
   

    }
  }

  return (

    <>

      <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "100vh" }}>
        <div className='w-75 container'>
          <Link to='/ ' style={{ textDecoration: "none" }} ><i class="fa-solid fa-arrow-left me-2"></i>
            Back To Home
          </Link>
          <div className='card bg-success p-5 mt-3'>
            <div className='row align-items-center'>
              <div className='col-lg-6 col-md-6'>
                <img src={authImage} alt="" width={"100%"} style={{ borderRadius: "10px" }} />

              </div>
              <div className='col-lg-6 col-md-6 p-3'>
                <div className='d-flex align-items-center flex-column'>
                  <h2>
                    <i class="fa-brands fa-stack-overflow"></i>  Project Fair
                  </h2>
                  <h5>
                    {
                      registerForm ? "Sign Up Your Accound" : "Sign Into Your Accound"
                    }
                  </h5>
                  <Form >
                    {
                      registerForm &&
                      <Form.Group md="4" controlId="validationCustom01">
                        <Form.Label>User name</Form.Label>
                        <Form.Control
                          value={userData.username}
                          onChange={(e) => setuserData({ ...userData, username: e.target.value })}
                          type="text"
                          placeholder="user name"
                        />
                      </Form.Group>
                    }
                    <Form.Group md="4" controlId="validationCustom01">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={userData.email}
                        onChange={(e) => setuserData({ ...userData, email: e.target.value })}
                        type="text"
                        placeholder="Email"
                      />
                    </Form.Group>
                    <Form.Group md="4" controlId="validationCustom01">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={userData.password}
                        onChange={(e) => setuserData({ ...userData, password: e.target.value })}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Form>
                  {
                    registerForm ?
                      <div>

                        <button className='btn btn-warning  rounded mt-3 ms-4 ' onClick={handleRegister}>Register</button>
                        <p>Already a user? click here to<Link to='/login' style={{ textDecoration: "none" }}> Login</Link></p>
                      </div> :
                      <div>
                      
                          <button className='btn btn-warning rounded mt-3 ms-4' onClick={handlelogin}>Login</button>
                   

                        <p>Already a user? click here to<Link to='/register' style={{ textDecoration: "none" }}> Register</Link></p>
                      </div>
                  }

                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Auth