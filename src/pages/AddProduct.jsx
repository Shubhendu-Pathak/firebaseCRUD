
import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useAuth } from '../context'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../Firebase/firebase'

function AddProduct() {

let [product, setProduct] = useState({
  name: 'Sony Mobile',
  price: '3000',
  image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlfGVufDB8fDB8fHww',
  date: new Date().toLocaleString("en-US",{month:"short",day:"2-digit",year:"numeric"})
})



let handleChange = (e) => {
setProduct({
  ...product, [e.target.name] : e.target.value
})
}


let handleSubmit = async(e) => {
  e.preventDefault()
console.log(product);

// -----------------
let productRef = collection(db, 'myprods')
try {
    await addDoc(productRef, product)
    alert('Product added successfully')


} catch (error) {
    throw new Error(error)
}

}

  return (
    <div>
    <div className="d-flex justify-content-between align-items-center mt-3">
    <h1>Add Product</h1>
 <Link to='/'>
 <img src="https://cdn-icons-png.flaticon.com/128/2099/2099190.png" alt="" />
 </Link>
    </div>
      
<div className='border border-3 w-50 m-auto mt-5 rounded-4 p-3'>
  <form onSubmit={handleSubmit}>
    <div className='mb-3'>
      <label className='form-label'>Product Name</label>
      <input type='text' className='form-control' name='name' value={product.name} onChange={handleChange} />
    </div>
    <div className='mb-3'>
      <label className='form-label'>Product Price</label>
      <input type='number' className='form-control' name='price' value={product.price} onChange={handleChange} />
    </div>
    <div className='mb-3'>
      <label className='form-label'>Product Image</label>
      <input type='text' className='form-control' name='image' value={product.image} onChange={handleChange}/>
    </div>
    <button type='submit' className='btn btn-primary'>Add Product</button>
  </form>
</div>

    </div>
  )
}

export default AddProduct