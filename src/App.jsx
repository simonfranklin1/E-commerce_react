import './App.css'
import Bag from './components/Bag'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import { Home, Checkout, Historic, Men, ProductPage, Products, Search, Women, SignUp, SignIn } from './routes'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <Bag />
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />}  />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/search" element={<Search />} />
        <Route path="/historic" element={<Historic />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes> 
      <Footer />
    </div>
  )
}

export default App
