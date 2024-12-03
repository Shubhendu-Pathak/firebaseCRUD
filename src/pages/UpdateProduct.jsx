import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../Firebase/firebase'

function UpdateProduct() {

  let [product, setProduct] = useState({
    id:'',
    name: '',
    price: '',
    image: '',
    date: new Date().toLocaleString("en-US",{month:"short",day:"2-digit",year:"numeric"})
  })
// console.log(product);


  let handleChange = (e) => {
    setProduct({
      ...product, [e.target.name] : e.target.value
    })
    }

let nav = useNavigate()

    // params
    let {id} = useParams()
    console.log(id);

    // context
    let {usercon, setusercon} = useAuth()
    
    useEffect(()=>{
      let singleProd = usercon?.userdata.find(ele=>{
        return ele.id === id
      })
      setProduct({
        ...product, 
        id:singleProd.id,
        name:singleProd.name,
        price:singleProd.price,
        image:singleProd.image,
      })
    },[id])

let handleSubmit = async(e) => {
  e.preventDefault()
console.log(product);
await updateDoc(doc(db, 'myprods', id), product)
alert("Updated Successfully")
nav('/')
}

  return (
    <div>
    <div className="d-flex justify-content-between align-items-center mt-3">
    <h1>Update Product</h1>
 <Link to='/'>
 <img src="https://cdn-icons-png.flaticon.com/128/2099/2099190.png" alt="" />
 </Link>
    </div>
      
<div className='border border-3 w-50 m-auto mt-5 rounded-4 p-3'>
  <form onSubmit={handleSubmit}>
    <div className='mb-3'>
      <label className='form-label'>Product Name</label>
      <input type='text' className='form-control' 
      name='name' 
      value={product?.name} 
      onChange={handleChange}/>
    </div>
    <div className='mb-3'>
      <label className='form-label'>Product Price</label>
      <input type='number' className='form-control' 
      name="price" 
      value={product?.price} 
      onChange={handleChange}/>
    </div>
    <div className='mb-3'>
      <label className='form-label'>Product Image</label>
      <input type='text' className='form-control' 
      name='image' 
      value={product?.image} 
      onChange={handleChange}/>
    </div>
    <button type='submit' className='btn btn-primary'>Update Product</button>
  </form>
</div>

    </div>
  )
}

export default UpdateProduct