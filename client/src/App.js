import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.js'
import Home from './components/home-component.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
