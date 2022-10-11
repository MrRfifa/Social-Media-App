import React from 'react'
import { useEffect } from 'react';
import {Formik,Field,Form,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import {  useNavigate } from 'react-router-dom'

function CreatePost() {
    let history=useNavigate();
    const initialValues={
        title:"",
        postText:"",
    };
    
    useEffect(()=>{
        if(!localStorage.getItem("accessToken")){history("/login")}
    })

    const validationSchema=Yup.object().shape({
        title:Yup.string().required("You must input a title"),
        postText:Yup.string().required(),
    })

    const onSubmit = (data)=>{
        axios.post("http://localhost:3001/posts",data,{headers:{
            accessToken:localStorage.getItem("accessToken")
        }}).then((response)=>{
        history("/")
    })
    }
   

    return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label for="">Title</label>
                <ErrorMessage name="title" component="span"></ErrorMessage>
                <Field autocomplete="off" id='inputCreatePost' name="title" placeholder="(Ex. Title...)"></Field>
                <label for="">post</label>
                <ErrorMessage name="postText" component="span"></ErrorMessage>
                <Field autocomplete="off" id='inputCreatePost' name="postText" placeholder="(Ex. Post...)"></Field>
                <button type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost