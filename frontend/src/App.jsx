import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/home'
import Dashboard from './pages/dashboard'
import AuthForm from './auth/authform'
import Loading from './components/spinloader'




function App() {
 

  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Loading/>}>
          <Route index element={<Home/>}/>
          <Route path='/auth' element={<AuthForm/>}/>
         </Route>
         <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
