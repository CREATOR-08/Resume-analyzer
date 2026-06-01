import React from 'react'

import Left from './Left';
import Lower from './Lower';
import Laptop from './Laptop';
const Sec1 = () => {
  return (
    <>
      <div className="md:relative text-center md:grid min-h-screen md:grid-cols-[0.6fr_0.4fr] flex flex-col text-white min-w-screen">

        {/* LEFT SIDE */}
        <Left></Left>

        {/* RIGHT GRID CELL (empty by design) */}
        <div />

        {/* FLOATING IMAGE */}
        <Laptop></Laptop>
        
        {/* LOWER TEXT */}
        <Lower></Lower>
        
      </div>
      
    </>
  )
}

export default Sec1
