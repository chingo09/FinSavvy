import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'; 
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify'; // use toast for showing quick noti to user
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const[name, setName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // check if signup or login
      axios.defaults.withCredentials = true
      
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})

        if (data.success) {
          // setIsLoggedin(true)
          // getUserData()
          dispatch({ type: 'LOGIN', payload: {name, email} });
          navigate('/email-verify');
        } else {
          toast.error(data.message)
        }

      } else {
        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          dispatch({ type: 'LOGIN', payload: data.user });
          navigate('/')
        } else {
          toast.error(data.message)
        }

      }
    } catch(error) {
      //console.error("Login error:", error);
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0'>

      <div className='p-10 rounded-lg shadow-lg w-full sm:w-96 text-sm'>
        
        <h2 className='text-3xl font-semibold text-center mb-3'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your Account' : 'Login to your account'}</p>

        <form onSubmit={onSubmitHandler} >
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
              <img src={assets.person_icon} />
              <input onChange={e => setName(e.target.value)} value={name} className='bg-transparent outline-none w-full' type="text" placeholder='Full Name' required />
            </div>
          )}  

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} />
            <input onChange={e => setEmail(e.target.value)} value={email} className='bg-transparent outline-none w-full' type="email" placeholder='Email' required />
          </div>

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} />
            <input onChange={e => setPassword(e.target.value)} value={password} className='bg-transparent outline-none w-full' type="password" placeholder='Password' required />
          </div>

          {state === 'Login' && (
            <p onClick={() => navigate('/reset-password')} className='mb-4 cursor-pointer'>Forgot password?</p>
          )}
          
          <button className='w-full px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900'>{state}</button>
        </form>

        {state === 'Sign Up' ? (
          <p className='text-gray-400 text-center text-xs mt-4'>Already have an account? {''}
            <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer  underline'>Login here</span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account? {''}
            <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer  underline'>Sign up</span>
          </p>
        )} 
      </div>
    </div>
  )
}

export default Login