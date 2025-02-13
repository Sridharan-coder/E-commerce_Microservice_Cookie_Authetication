import { Route, Routes,useNavigate } from 'react-router-dom';
import './App.css';
import Seller from './Seller/Seller';
import Maintance from './Maintance/Maintance';
import { useEffect } from 'react';


function App() {

  const navigate=useNavigate()

  useEffect(()=>{
    navigate("/seller");
    // eslint-disable-next-line
  },[])

  return (
    <>
      <Routes>
        <Route path="/Seller" element={<Seller />} />
        <Route path="/maintance" element={<Maintance/>} />
      </Routes>
    </>
  )

}

export default App;
