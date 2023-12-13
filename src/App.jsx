import { useContext } from 'react'
import './App.css'
import Bag from './components/Bag'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { Home, Checkout, Historic, Men, ProductPage, Products, Search, Women } from './routes'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <Bag />
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/produtos' element={<Products />} />
        <Route path="/produtos/:id" element={<ProductPage />}  />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/masculino" element={<Men />} />
        <Route path="/feminino" element={<Women />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/historico" element={<Historic />} />
      </Routes> 
      <Footer />
    </div>
  )
}

export default App
