import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteprojectAPI, userprojectAPI } from '../services/allAPI';
import { addprojectResponseContext, editprojectResponseContext } from '../context/ContextShare';
import EditProject from './EditProject';

function MyProject() {
  const {addprojectResponse,setAddprojectResponse}=useContext(addprojectResponseContext)
  const {editprojectResponse,seteditprojectResponse}= useContext(editprojectResponseContext)
  const [userproject,setuserproject]=useState([])
  const getUserproject = async()=>{
const token = sessionStorage.getItem("token");
const reqHeader ={
  "Content-Type":"application/json",
  "Authorization":`Bearer ${token}`
}
const result = await userprojectAPI(reqHeader)
console.log("=======inside my project====");
console.log(result.data);
setuserproject(result.data)
  }
  useEffect(()=>{
    getUserproject()
  },[addprojectResponse,editprojectResponse])
  const handleDelete  = async(id)=>{
const token = sessionStorage.getItem("token")
const reqHeader = {
  "Content-Type":"application/json",
  "Authorization":`Bearer ${token}`
}
const result = await deleteprojectAPI(id,reqHeader)
if(result.status===200){
  alert("project deleted successfully")
  getUserproject();
}
  }
  return (
  
 <>

<div className='card shadow p-5 ms-3 me-5 mb-5'>
  <div className='d-flex mb-3'>
    <h3 className='text-success ms-3'> my projects</h3>
    <div className=' ms-auto'>
      <AddProject/>
    </div>

  </div>
  <div>
    
      {
        userproject?.length>0?
        userproject.map((item)=>(
          <div className='border border-success d-flex align-items-center rounded p-2 mb-3'>
          <h5>{item.title}</h5>
      <div className='ms-auto'>

      <EditProject project={item}/>
        <a href={item.github} target='_blank' className='btn'><i class="fa-brands fa-github text-success"></i></a>
        <button className='btn'><i class="fa-solid fa-trash text-danger" onClick={()=>handleDelete(item._id)}></i></button>
      </div>
    </div>

        )):
        <p className='text-danger fw-bolder fs-4 mt-3'>No projects uploaded yet!!</p>
      }
     
   
  </div>
 </div>

 
 </>
  )
}

export default MyProject