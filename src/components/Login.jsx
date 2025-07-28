import React, { useState } from 'react'
import { data, Link ,useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button , Input } from './index'
import { useDispatch } from 'react-redux'
import authService, { AuthService } from '../appwrite/auth'
import { useForm } from 'react-hook-form'
const login= async(data)=>{
    setError("")
    try{
     const session=await authService.login(data)
     if(session){
        const userData=await authService.getCurrentUser()
     }
     if(userData){
        dispatch(authLogin(userData))
     }
    }catch(error){
      setError(error.message)
    }
} 
function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register, handleSubmit }=useForm()
    const {error ,setError}=useState(null)


  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg p-10 bg-gray-100 rounded-xl border border-black/10 `}>
        <div className='mb-2 flex justify-center '>
            <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'></Logo>
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign in your account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
        Don&apos; t have any account?&nbsp;
        <Link to="signup"
         className='font-medium text-primary transition-all duration hover:underline'>
            Sign Up
        
        </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input labal="Email :" 
                 placeholder="Enter your email"
                 type="email"
                 {...register("email",{
                    required:true,
                    validate:{
                        matchPattren:(value)=>{
                            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)||
                            "Email Address Must be valid"
                        }
                    }
                 })}
                ></Input>
                <Input labal="password" placeholder="Enter your password" type="password"
                {...register("password",{
                    required:true
                })}
                
                ></Input>
                <Button 
                type="submit"
                className="w-full" 
                >Sign in</Button>
            </div>
        </form>
        
        </div>
    </div>
  )
}

export default Login