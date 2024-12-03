import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context'
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

function ProductTable() {

  let [txt, setxt] = useState('')

  //context data
  let {usercon, setusercon} = useAuth()
console.log(usercon);

let getData =()=>{
try {
  let q = query(
    collection(db, 'myprods')
  )
  let data = onSnapshot(q, (para)=>{
    let allProds = []
para.forEach(ele=>{
  allProds.push({id:ele.id, ...ele.data()})
})
setusercon(
  {isLoad:false, userdata: allProds}
)
  })
} catch (error) {
  throw new Error(error)
}
}

useEffect(()=>{
  getData()
},[])

// delete post
const handleDelete = async(para) => {
  console.log(para);
  try {
    
if(window.confirm('Are you sure you want to delete')){
  await deleteDoc(doc(db, "myprods", para))
  alert('Prods deleted successfully')
  let filterData = usercon?.userdata.filter((ele,ind)=>{
    return ele.id !== para
  })
  setusercon({...usercon, userdata: filterData})
}

  } catch (error) {
    throw new Error(error)
  }
}

  return (
    <div className='my-3'>
        <h1 className='text-center border-bottom border-5 border-success w-50 m-auto p-3'>FIREBASE -CRUD</h1>
        <div className=" my-3 -subtle p-3 d-flex justify-content-evenly align-itens-center" >
            <input type="text" 
            className="form-control w-50" 
            id="search" 
            value={txt}
            onChange={(e)=>setxt(e.target.value)}
            placeholder="Search" />
         <Link to='/addproduct'>
         <button className='btn btn-outline-warning'>
                ADD-PRODUCT
                </button>
         </Link>
        </div>
        <table className="table table-striped table-hover ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product-Name</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Date</th>
      <th scope="col">Action</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
{
  usercon.userdata && 
  usercon.userdata
  .filter((ele)=>{
if(txt){
  return ele.name.toLowerCase().includes(txt.toLowerCase())
}else{
  return ele
}
  })
  .map((item, index)=>(
    <tr key={index}>
    <th scope="row">{index+1}</th>
    <td>{item.name}</td>
    <td><img height={'80px'} src={item.image} alt="" /></td>
    <td>Rs {item.price}</td>
    <td>{item.date}</td>
    <td>
      <Link to={`/updateproduct/${item.id}`}>
      <button className='btn btn-outline-primary'>EDIT</button>
      </Link>
    </td>
    <td><button
    onClick={()=>handleDelete(item.id)}
    >DELETE</button></td>
  </tr>
  ))
}
 
  </tbody>
</table>
    </div>
  )
}

export default ProductTable