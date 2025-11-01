import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notes from './Pages/Notes';
import Login from './Pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Notes />} path='/' />
        <Route element={<Login />} path='/login' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
