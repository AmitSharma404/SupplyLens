import React from 'react';
import { getProducts } from '../../Instance/productInstance';
import { useEffect } from 'react';
import { useState } from 'react';
export const DashboardInventory = () => {

  const [products,setProducts] = useState([]);

  useEffect(()=>{
    (async() => {
      const products = await getProducts();
      setProducts(products)
    } )()
  },[])

  return (
    <div>
      <div>
        {products?.map((item,key) => (
      <div key={key}>
        <p>{item?.name}</p>
        <p>{item?._id}</p>
        <p>{item?.category}</p>
        <p>description :{item.description}</p>
        <p>Rs.{item.price}</p>
      </div>
    ))}
      </div>
      <div>

      </div>
    </div>
  )
};
