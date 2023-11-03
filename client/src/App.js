import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.js'
import Home from './components/home-component.js'
import Register from './components/register-component.js'
import Login from './components/login-component.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
