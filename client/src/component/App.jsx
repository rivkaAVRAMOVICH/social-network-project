import { useState } from 'react'
import {Route, Routes, Navigate } from "react-router-dom"
import Home from './Home'
import Login from './Login'
import Todos from './Todos'
import Register from './Register'
import NotFound from './NotFound'
import Posts from './Posts'
import Post from './Post'
import Albums from './Albums'
import Album from './Album'
import Navigation from './Navigation'
import { useEffect, createContext } from 'react';
import '../css/App.css'
export const CurrentUser = createContext({})
export const Error = createContext({})
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage,setErrorMessage]=useState('');
  useEffect(() => {
    if (!currentUser) {
      const user = JSON.parse(localStorage.getItem('currentUser'))
      setCurrentUser(user)
    }
  }, [currentUser])
  useEffect(() => {
    if (errorMessage !== '') {
      const timer = setTimeout(() => {
        setErrorMessage(''); 
      }, 4000);
      return () => clearTimeout(timer); 
    }
  }, [errorMessage]);
  return (
    <Error.Provider value={{errorMessage,setErrorMessage}}>
    <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      <Navigation />
      {errorMessage!=='' && <p className="error-message">{errorMessage}</p>}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/users/:id">
          <Route path="home" element={<Home />} />
          <Route path='todos' element={<Todos />} />
          <Route path='posts/*' element={<Posts />} >
          <Route path=':postId' element={<Post/>}/>
          <Route path=':postId/comments' element={<Post/>}/>
          </Route>
          <Route path='albums' element={<Albums />} />
          <Route path='albums/:albumId/photos' element={<Album />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUser.Provider>
    </Error.Provider>
  )
}

export default App
