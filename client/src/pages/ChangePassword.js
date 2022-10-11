import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    let history=useNavigate()
    const changePassword=()=>{
        axios.put("http://localhost:3001/auth/changepassword",{oldPassword:oldPassword,newPassword:newPassword},
        {
            headers:{
              accessToken:localStorage.getItem("accessToken")
            }
          }
        ).then((response)=>{
            if(response.data.error){
                alert(response.data.error)
            }
            else{
                history("/")
            }
        })
    }
  return (
    <div>
        <h1>Change your Password</h1>
        <input type="password" placeholder='Old password' onChange={(event)=>{setOldPassword(event.target.value)}}/>
        <input type="password" placeholder='New password' onChange={(event)=>{setNewPassword(event.target.value)}}/>
        <button onClick={changePassword}>Save changes</button>
    </div> 
  )
}

export default ChangePassword