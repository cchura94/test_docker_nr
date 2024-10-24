
import { NavLink, useLocation } from 'react-router-dom'
// import './App.css'
import Routes from './routes'

import './layouts/css/style.css';

import './layouts/charts/ChartjsConfig';
import { useEffect } from 'react';

function App() {

  const location = useLocation();

  
  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change


  return (
    <>      
      <Routes></Routes>
    </>
  )
}

export default App
