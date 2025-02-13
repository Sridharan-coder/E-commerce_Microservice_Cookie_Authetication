
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Maintance from './Maintance/Maintance';
import Buyer from './Buyer/Buyer';
import { useState } from 'react';


function App() {

  const [isMaintance,setIsMaintance]=useState(true);

  return (
    <>
      <div className="application" >

        {
          isMaintance ?
            <Buyer setIsMaintance={setIsMaintance}/>
            :
            <Routes>
              <Route path="*" element={<Maintance setIsMaintance={setIsMaintance}/>} />
            </Routes>
        }
      </div>
    </>
  )

}

export default App;
