import React, { useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import InputFeild from './components/Input';
import Logo from './components/Logo';
import FormButton from './components/FormButton';
import { Link } from 'react-router-dom';

const Login = () => {

  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})


  const login = async (phoneNumber, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register`, {phoneNumber, password});
  
      // Assuming the token is in response.data.token
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log('Login successful');
    } catch (error) {
      
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
      console.error('Login failed', error.response.data);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    await login(phoneNumber, password);
  };

  return (
    <>
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Logo path={'/'} title={'Ticketing System'}/>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Login in to your account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                      <div>
                          <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone No</label>
                        
                          <PhoneInput className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'  defaultCountry="ET" value={phoneNumber}  onChange={setPhoneNumber} />
                          {
                            errors.message && (
                              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>
                            )
                          }
                           
                        
                      </div>
                      <InputFeild 
                        handleChange={(e)=> setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        placeholder={'••••••••'}
                        title={'password'}
                        error={errors.password && errors.password[0]}
                      />
                      <div className="flex items-center justify-between">
                          <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                              </div>
                              <div className="ml-3 text-sm">
                                <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                              </div>
                          </div>
                          <Link to={'/forget-password'} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                      </div>
                      <FormButton text={'sign in'}/>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <Link to={'/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
    
    </>

  );
};

export default Login;


  