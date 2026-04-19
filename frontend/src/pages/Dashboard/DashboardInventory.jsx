import React from 'react';
import { getProducts } from '../../Instance/productInstance';
import { useEffect } from 'react';
import { useState } from 'react';
export const DashboardInventory = () => {

  const [products,setProducts] = useState('');

  useEffect(()=>{
    (async() => {
      const products = await getProducts();
      console.log(products);
    } )()
  },[])

  return <div>
    
  </div>;
};
