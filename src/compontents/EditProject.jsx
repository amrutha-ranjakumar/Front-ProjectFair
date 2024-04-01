import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { BASE_URL } from '../services/baseurl';
import { editUserProjectAPI } from '../services/allAPI';
import { editprojectResponseContext } from '../context/ContextShare';

function EditProject({ project }) {
  const {editprojectResponse,seteditprojectResponse}=useContext(editprojectResponseContext)
  const [preview, setpreview] = useState("")
  console.log("====project details in edit project====");
  console.log(project);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [projectDetails, setprojectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    github: project.github,
    Website: project.Website,
    Overview: project.Overview,
    projectImage: ""
  })
  useEffect(() => {
    if (projectDetails.projectImage) {
      setpreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])
  const handleReset = () => {
    setprojectDetails({
      id: project._id,

      title: project.title,
      language: project.language,
      github: project.github,
      Website: project.Website,
      Overview: project.Overview,
      projectImage: ""

    })
    setpreview("")
  }
  const handleUpdate = async (e) => {
    e.preventDefault()
    const { title, language, github, Website, Overview, projectImage, id } = projectDetails;
    if (!title || !language || !github || !Website || !Overview  || !id) {
      alert("please fill the form completely")
    }
    else {
      const reqBody = new FormData();
      reqBody.append("title", title)
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("Website", Website);
      reqBody.append("OverView", Overview);
      preview ? reqBody.append("projectImage", projectImage) :
        reqBody.append("projectImage", project.projectImage);
      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectAPI(id, reqBody, reqHeader)
        console.log(result);
        if(result.status === 200){
         seteditprojectResponse(result)
          alert("project updated successfully");
          handleClose()
        }
        else{
          alert(result.response.data)
        }
      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await editUserProjectAPI(id, reqBody, reqHeader)
        if(result.status === 200){
          seteditprojectResponse(result)
          alert("project updated successfully");
            handleClose()
        }
        else{
          alert(result.response.data)
        }

      }


    }
  }
  return (
    <>

      <button className='btn'><i class="fa-solid fa-pen-to-square text-info" onClick={handleShow}></i></button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>ADD PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-lg-6'>
              <label htmlFor="projectImageupload">
                <input
                  onChange={((e) => setprojectDetails({ ...projectDetails, projectImage: e.target.files[0] }))}
                  type="file" style={{ display: "none" }} id='projectImageupload' />
                <img height={"300px"}
                  width={"90%"}
                  src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} alt="" />
              </label>
            </div>
            <div className='col-lg-6 d-flex justify-content-center align-items-center flex-column'>
              <div className='w-100 mb-3 mt-3 '>
                <input
                  value={projectDetails.title}
                  onChange={((e) => setprojectDetails({ ...projectDetails, title: e.target.value }))}
                  type="text " className='form-control border-success ' placeholder='Project title' />
              </div>

              <div className='mt-3 w-100'>
                <input

                  value={projectDetails.language}
                  onChange={((e) => setprojectDetails({ ...projectDetails, language: e.target.value }))}
                  type="text" className='form-control border-success' placeholder='Languages used' />
              </div>
              <div className='mt-3 w-100'>
                <input
                  value={projectDetails.github}
                  onChange={((e) => setprojectDetails({ ...projectDetails, github: e.target.value }))}

                  type="text" className='form-control border-success' placeholder='Github Url' />
              </div>
              <div className='mt-3 w-100'>
                <input
                  value={projectDetails.Website}
                  onChange={((e) => setprojectDetails({ ...projectDetails, Website: e.target.value }))}

                  type="text" className='form-control border-success' placeholder='website Url' />
              </div>
              <div className='mt-3 w-100'>
                <textarea
                  value={projectDetails.Overview}
                  onChange={((e) => setprojectDetails({ ...projectDetails, Overview: e.target.value }))}

                  className='form-control  border-success' placeholder='overView'></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleReset} >
            Reset
          </Button>
          <Button variant="success" onClick={handleUpdate} >
            update Project
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default EditProject