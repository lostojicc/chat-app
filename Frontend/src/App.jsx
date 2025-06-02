import React, { useEffect } from 'react'
import NavBar from './components/NavBar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore'
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" /> 
      </div>
    )
  }

  return (
    <div data-theme="abyss">
      <NavBar/>

      <Routes>
        <Route path='/' element={ authUser ? <HomePage/> : <Navigate to="/signin"/> }/>
        <Route path='/signup' element={ !authUser ? <SignUpPage/> : <Navigate to="/"/> }/>
        <Route path='/signin' element={ !authUser ? <SignInPage/> : <Navigate to="/"/> }/>
        <Route path='/profile' element={ authUser ? <ProfilePage/> : <Navigate to="/signin"/> }/>
      </Routes>

      <Toaster />
    </div>
  )
}

export default App