import { useState ,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import AuthService from './appwrite/auth';
import { login,logout } from './store/authSlice'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { meta } from '@eslint/js'
import { Footer, Header } from './components'

function App() {
  console.log(import.meta.env);
 const [loading,setloading] =useState(true)
 const dispatch=useDispatch()
 useEffect(()=>{
  AuthService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }else{
      dispatch(logout())
    }
  })
  .finally(()=>setloading(false))
 },[])

  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-50'>
      <div className='w-full block'>
        <Header/>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
