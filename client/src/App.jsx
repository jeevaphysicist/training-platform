import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import Cookies from 'js-cookie'

const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Home = React.lazy(() => import('./pages/Home'));

const App = () => {
  const [islogged,setIslogged] = useState(false);

  useEffect(()=>{
      const token = Cookies.get('refresh_token');
      console.log("Cookies",token);

      if(token){
        setIslogged(true);
      }
      else{
        setIslogged(false);
      }
  },[])

  console.log("isLogged",islogged);

  return (
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
        {
          islogged ?
          <Routes>           
            <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
          </Routes>
             :
          <Routes>           
            <Route path="/" element={<ErrorBoundary><Login /></ErrorBoundary>} />
            <Route path="/signup" element={<ErrorBoundary><Signup /></ErrorBoundary>} />
          </Routes>
         }
        </Suspense>
        <ToastContainer />
      </div>
  );
};

export default App;
