import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from './components/ErrorBoundary';
import Cookies from 'js-cookie'
import LoadingPage from './pages/Loading';

const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Home = React.lazy(() => import('./pages/Home'));
const NotFoundPage = React.lazy(() => import('./pages/404Error'));
const Course = React.lazy(() => import('./pages/Course'));

const App = () => {
  const [islogged,setIslogged] = useState(false);

  useEffect(()=>{
      const token = Cookies.get('refresh_token');
      // console.log("Cookies",token);

      if(token){
        setIslogged(true);
      }
      else{
        setIslogged(false);
      }
  },[])

  // console.log("isLogged",islogged);

  return (
      <div className="App">
       
        <Suspense fallback={<LoadingPage/>}>
        {
          islogged ?
          <Routes> 
             <Route path="*" element={<Navigate to={'/not-found'}/>} />
            <Route path='/not-found' element={<ErrorBoundary><NotFoundPage /></ErrorBoundary>} />          
            <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
            <Route path="/loading" element={<ErrorBoundary><LoadingPage /></ErrorBoundary>} />
            <Route path="/course" element={<Course />} />  <Route path='/not-found' element={<ErrorBoundary><NotFoundPage /></ErrorBoundary>} />
          </Routes>
             :
          <Routes>           
            {/* <Route path="*" element={<Navigate to={'/not-found'}/>} /> */}
            {/* <Route path="/loading" element={<ErrorBoundary><LoadingPage /></ErrorBoundary>} /> */}
            {/* <Route path='/not-found' element={<ErrorBoundary><NotFoundPage /></ErrorBoundary>} /> */}
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
