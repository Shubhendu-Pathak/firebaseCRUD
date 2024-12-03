import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import ProductTable from './pages/ProductTable';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';

function App() {
  return (
    <div>
      
    <Routes>
     <Route path="/" element={ <ProductTable/> } />
     <Route path="/addproduct" element={ <AddProduct/> } />
     <Route path="/updateproduct/:id" element={ <UpdateProduct/> } />
    </Routes>
 
 </div>
  )
}

export default App