import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/auth/action';
import loader from '../../../assets/svgs/Rolling@1x-1.0s-200px-200px.svg'
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate=useNavigate()
  const auth= localStorage.getItem("authToken")
  const statuss= localStorage.getItem("status")
//  useEffect(() => {
//   if(!auth||!statuss){
//     localStorage.setItem("authToken",true)
//     localStorage.setItem("status",true)
//   }
//   else{
//     // navigate('/home')
//     navigate('/projects')
//   }

//  }, [auth,statuss])
 


  const loading=useSelector((state)=>state.authReducer?.login?.loading)
  const data=useSelector((state)=>state.authReducer?.login?.data)
  const isAuthorizedLogin = useSelector((state) => state.authReducer.isAuthenticated);

  const status=localStorage.getItem('status')
  useEffect(() => {
    if(status==='verify'){
        navigate("/otp")
      }
      if(status===true){
        navigate("/projects")
      }
      if(status==='update_profile'){
        navigate("/")
      }
  }, [status])
  useEffect(() => {
   if(data){
    setEmail('');
    setPassword('');
   }
  }, [data])
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login({email,password}))
    localStorage.setItem('email',email)
    // Perform your action here (e.g., API call)
    console.log('Email:', email);
    console.log('Password:', password);
    // Reset the form
 
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="relative">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-lg "></div>
        <div id="form-container" className="bg-white py-16 px-8 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
           <div className='flex flex-col items-center'>
           {/* <img className='w-32' src={Logo} alt="" /> */}
           <img className='mb-8' src={Logo} alt="" />

           {/* <h2 id="form-title" className="text-center text-2xl font-bold mb-10 mt-2 text-gray-800">Google Analytics</h2> */}
           </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              className="w-full h-12 border border-gray-300 px-3 rounded-lg focus:outline-blue-500"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
           <div className="relative">
      <input
        className="w-full h-12 border border-gray-300 px-3 rounded-lg focus:outline-blue-500"
        placeholder="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
            {
              loading?<button
              className="w-full flex justify-center items-center h-12 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             
            >
              <img className='w-8' src={loader} alt="" />
            </button>:
            <button
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign in
          </button>
            }
            
            {/* <a className="text-blue-500 hover:text-blue-800 text-sm" href="#">Forgot Password?</a> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
