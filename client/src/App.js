import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout.js'
import Home from './components/home-component.js'
import Register from './components/register-component.js'
import Login from './components/login-component.js'
import Profile from './components/profile-component.js'
import AuthService from './services/auth.service.js'

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />}>
          <Route index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login setCurrentUser={setCurrentUser}/>} />
          <Route path='profile' element={<Profile currentUser={currentUser}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
