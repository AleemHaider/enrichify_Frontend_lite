import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routers from './routes';
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import { Provider, } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

// import loader from './assets/website/images/Loader.gif'
const root = ReactDOM.createRoot(document.getElementById('root'));

function Loading() {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='text-center flex flex-col justify-center items-center'>
        {/* <img className="w-1/2" src={loader} alt="" /> */}
        <h2 className='font-bold text-center text-2xl'>Sanaidee is Loading......</h2>
      </div>
    </div>
  )
}

root.render(
 <React.StrictMode>
    <Provider store={store}>
      <>
        <Suspense fallback={<Loading />}>
          <ToastContainer />
          <Routers />
        </Suspense>
      </>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
