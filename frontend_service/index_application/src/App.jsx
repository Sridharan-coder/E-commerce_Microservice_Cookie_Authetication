
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import ProductSearch from './ProductSearch/ProductSearch';
import Product from './Product/Product';
import Cart from './Cart/Cart';
import PaymentPage from './PaymentPage/PaymentPage';
import Maintance from './Maintance/Maintance';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product/:p_type' element={<ProductSearch />} />
        <Route path='/item/:p_type' element={<Product />} />
        <Route path='/viewcart' element={<Cart />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/maintance' element={<Maintance/>}/>
        
      </Routes>
    </>
  )

}

export default App;
