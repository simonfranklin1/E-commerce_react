import { useContext } from 'react'
import './App.css'
import Bag from './components/Bag'
import Header from './components/Header'
import Home from "./routes/Home.jsx"
import { Outlet } from 'react-router-dom'
import { StoreContext } from './context/StoreContext.jsx'

function App() {
  const {start} = useContext(StoreContext)

  return (
    <div className="App">
      <Bag />
      <Header />
      <Outlet />
    </div>
  )
}

export default App
