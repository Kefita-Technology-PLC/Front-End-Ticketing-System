import React, { useState } from 'react';
import axios from 'axios';
import InputFeild from './components/Input';
import { Link } from 'react-router-dom';
import Logo from './components/Logo';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register`, formData);

      // Handle successful registration, e.g., redirect to login
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle errors, e.g., display validation errors
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <Logo path={'/'} title={'Ticketing System'} src={''}/>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <FormHeading     />
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                       
                        <InputFeild 
                          handleChange={handleChange} 
                          value={formData.name} 
                          name={'name'} 
                          placeholder={'Jon Doe'} 
                          title={'Your Full Name'}
                          error={errors.name && errors.name[0]}  
                        />

                        <InputFeild 
                          handleChange={handleChange} 
                          value={formData.email} 
                          name={'email'} 
                          placeholder={'jondoe@example.com'} 
                          title={'Email'}  
                          type={'email'}
                          error={errors.email && errors.email[0]}
                        />

                        <InputFeild 
                          handleChange={handleChange} 
                          value={formData.phone_no} 
                          name={'phone_no'} 
                          placeholder={'+251 ********'} 
                          title={'Phone NUmber'}  
                          error={errors.phone_no && errors.phone_no[0]}
                        />

                        <InputFeild  
                          handleChange={handleChange} 
                          value={formData.password} 
                          name={'password'} 
                          placeholder="••••••••" 
                          title={'Password'} 
                          type={'password'}
                          error={errors.password && errors.password[0]}
                        />

                        <InputFeild  
                          handleChange={handleChange} 
                          value={formData.password_confirmation} 
                          name={'password_confirmation'} 
                          placeholder="" 
                          title={'Password Confirmation'} 
                          type={'password'}
                        />
                      

                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label for="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={'/terms-and-conditions'}>Terms and Conditions</Link></label>
                            </div>
                        </div>
                        <FormButton     />
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>



    </>

  );
};

export default RegisterForm;

    function FormHeading({}) {
      return (<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
      </h1>);
    }

    function FormButton({}) {
      return (<button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>);
    }
        