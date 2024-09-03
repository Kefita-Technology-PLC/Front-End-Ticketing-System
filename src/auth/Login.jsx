import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import InputFeild from './components/Input';
import Logo from './components/Logo';
import FormButton from './components/FormButton';
import { Link, useNavigate } from 'react-router-dom';
import usePasswordToggle from '../custom-hooks/usePasswordToggle';
import { apiEndpoint } from '../data/AuthenticationData';
import { set } from 'react-hook-form';


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [passwordInputType, ToggleIcon] = usePasswordToggle()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedPassword = localStorage.getItem('password');
    if (storedPhoneNumber && storedPassword) {
      setPhoneNumber(storedPhoneNumber);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const login = async (phoneNumber, password) => {
    setLoading(true)
    try {
      const response = await axios.post(`${apiEndpoint}/login`, {
        phone_no: phoneNumber, 
        password: password
      });
      const token = response.data.token;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setLoading(false)
      if (rememberMe) {
        localStorage.setItem('phoneNumber', phoneNumber);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('password');
      }

      navigate('/')
    } catch (error) {
      setLoading(false)
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
        console.log(error.response.data.errors)
      }
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    await login(phoneNumber, password);
  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  }

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
                        
                          <PhoneInput className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'  defaultCountry="ET" name="phone_no" value={phoneNumber}  onChange={setPhoneNumber} />
                          {
                            errors.phone_no && (
                              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phone_no[0]}</p>
                            )
                          }
                           
                        
                      </div>
                      <InputFeild 
                        handleChange={(e)=> setPassword(e.target.value)}
                        value={password}
                        name={'password'}
                        placeholder={'••••••••'}
                        title={'password'}
                        type={passwordInputType}
                        iconEye={ToggleIcon}
                        eye={true}
                        error={errors.password && errors.password[0]}
                      />
                          {
                            errors.message && (
                              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>
                            )
                          }
                      <div className="flex items-center justify-between">
                          <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input 
                                  id="remember" aria-describedby="remember" type="checkbox" 
                                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                                  required=""
                                  checked={rememberMe} 
                                  onChange={handleRememberMeChange}/>
                              </div>
                              <div className="ml-3 text-sm">
                                <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                              </div>
                          </div>
                          <Link to={'/forget-password'} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                      </div>
                      <FormButton loading={loading} text={'sign in'}/>
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


  