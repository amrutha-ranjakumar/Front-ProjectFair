import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { addprojectAPI } from '../services/allAPI';
import { addprojectResponseContext } from '../context/ContextShare';

function AddProject() {
  //useContext hook is used to access context-api
  const {addprojectResponse,setAddprojectResponse}=useContext(addprojectResponseContext)

  const [preView,setPreview]=useState("")
  const [token,setToken]=useState("")
  const [projectDetails, setprojectDetails] = useState({
    title: "",
    language: "",
    github: "",
    Website: "",
    Overview: "",
    projectImage: ""
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAdd =async(e)=>{
    e.preventDefault();
    console.log("==================project Details=============");
    const {title,language,github,Website,Overview,projectImage}= projectDetails;
    if(!title || !language || !github || !Website || !Overview || !projectImage){
      alert("please fill the form completely")
    }
    else{
      //for uploading files we have to send data as formdata
      //content type is multipart/form-data
      const reqBody = new FormData();
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("Website",Website)
      reqBody.append("Overview",Overview)
      reqBody.append("projectImage",projectImage)
      const reqHeader ={
            "Content-Type":"multipart/form-data",
            "AuthoriZation":`Bearer ${token}`
      }
      const result = await addprojectAPI(reqBody,reqHeader)
      if(result.status === 200){
      alert("project added successfully")
      setAddprojectResponse(result)
      handleCloseClear();
      handleClose()
}
else{
      alert(result.response.data)

    }
  
  }

    console.log(projectDetails);
  }

  // console.log("enter details");
  // console.log(projectDetails);

  useEffect(()=>{
    if(projectDetails.projectImage){
      //default code to create preview of image that we take from input box with type file
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])
  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
  },[])
  const handleCloseClear =()=>{
    setprojectDetails({
      title: "",
      language: "",
      github: "",
      Website: "",
      Overview: "",
      projectImage: ""
    })
    setPreview("")
  }

  return (
    <>
      <Button variant='success mb-4' onClick={handleShow}>Add Project</Button>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title  className='text-success'>ADD PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <label htmlFor="projectImageupload">
                <input 
               onChange={((e) => setprojectDetails({ ...projectDetails,projectImage:e.target.files[0]}))}
                type="file" style={{ display: "none" }} id='projectImageupload' />
                <img height={"300px"}
                width={"90%"}
                  src={preView?preView:"https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_640.png"} alt="" />
              </label>
            </div>
            <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column'>
              <div className='w-100 mb-3 mt-3 '>
                <input
                  value={projectDetails.title}
                  onChange={((e) => setprojectDetails({ ...projectDetails, title:e.target.value }))}
                  type="text " className='form-control border-success ' placeholder='Project title' />
              </div>

              <div className='mt-3 w-100'>
                <input

                  value={projectDetails.language}
                  onChange={((e) => setprojectDetails({ ...projectDetails,language:e.target.value }))}
                  type="text" className='form-control border-success' placeholder='Languages used' />
              </div>
              <div className='mt-3 w-100'>
                <input
                  value={projectDetails.github}
                  onChange={((e) => setprojectDetails({ ...projectDetails,github:e.target.value }))}

                  type="text" className='form-control border-success' placeholder='Github Url' />
              </div>
              <div className='mt-3 w-100'>
                <input
                  value={projectDetails.Website}
                  onChange={((e) => setprojectDetails({ ...projectDetails,Website:e.target.value }))}

                  type="text" className='form-control border-success' placeholder='website Url' />
              </div>
              <div className='mt-3 w-100'>
                <textarea 
                value={projectDetails.Overview}
                onChange={((e)=>setprojectDetails({...projectDetails,Overview:e.target.value}))}
                
                className='form-control  border-success' placeholder='overView'></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseClear}>
            Clear
          </Button>
          <Button variant="success" onClick={handleAdd}>
         Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProject