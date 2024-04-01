import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseurl";



//1)register user
export const registerAPI = async(user)=>{
    return await commonAPI("post",`${BASE_URL}/user/register`,user,"")
}

//2) login user
export const loginAPI = async(reqBody)=>{
    return await commonAPI("post",` ${BASE_URL}/user/login`,reqBody,"")
}

//3) add project
export const addprojectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${BASE_URL}/project/add`,reqBody,reqHeader)
}

//4) get home project (3 times)
export const homeProjectAPI = async()=>{
    return await commonAPI("GET",`${BASE_URL}/project/home-projects`,'','')
}

 //5) get all project
//search is passed as query parameter
//path?keyvalue
 export const allProjectAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/project/all-project?search=${searchKey}`,'',reqHeader)
 } 
 //6)get user project
 export const userprojectAPI= async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/project/user-ptoject`,'',reqHeader)
 }


 //7)update user project
 export const  editUserProjectAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/projects/edit/${id}`,reqBody,reqHeader)
 }


//8)Delete a project
export const  deleteprojectAPI= async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${BASE_URL}/project/remove/${id}`,{},reqHeader)
}