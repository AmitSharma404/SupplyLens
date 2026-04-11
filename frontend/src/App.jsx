import React from 'react'
import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from './components/Footer'

const App = () => {
  return (
    <div className="w-full bg-background">
      <div className="max-w-7xl   mx-auto px-2">
        {/* <Header /> */}
        <Outlet />
        {/* <Footer/> */}
      </div>
    </div>
  );
}

export default App