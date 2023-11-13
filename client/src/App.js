import { React, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './components/home-component.jsx'
import Register from './components/register-component.jsx'
import Login from './components/login-component.jsx'
import Profile from './components/profile-component.jsx'
import Course from './components/course-component.jsx'
import Enroll from './components/enroll-component.jsx'
import PostCourse from './components/postCourse-component.jsx'
import MernIntro from './components/mernIntro-component.jsx'
import AuthService from './services/auth.service.js'

function App () {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser())

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
          <Route index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path='profile' element={<Profile currentUser={currentUser}/>} />
          <Route path='course' element={<Course currentUser={currentUser}/>} />
          <Route path='enroll' element={<Enroll currentUser={currentUser}/>} />
          <Route path='postCourse' element={<PostCourse currentUser={currentUser}/>} />
          <Route path='mernIntro' element={<MernIntro />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
