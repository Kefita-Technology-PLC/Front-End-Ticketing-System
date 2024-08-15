import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputFeild from './components/Input';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from './components/Logo';
import PhoneInput from 'react-phone-number-input';
import usePasswordToggle from '../custom-hooks/usePasswordToggle';

const RegisterForm = () => {
  const [passwordInputType, ToggleIcon] = usePasswordToggle();
  const [passwordInputTypeConfirm, ToggleIconConfirm] = usePasswordToggle();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  
  const navigate = useNavigate(); 

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      phone_no: phoneNumber,
    }));
  }, [phoneNumber]);

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
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin-register`, formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
      navigate('/'); 
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
       
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Logo path={'/'} title={'Ticketing System'} src={''} />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <FormHeading />
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

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                  <PhoneInput
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultCountry="ET"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                  {errors.phone_no && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phone_no[0]}</p>
                  )}
                </div>

                <InputFeild  
                  handleChange={handleChange} 
                  value={formData.password} 
                  name={'password'} 
                  placeholder="••••••••" 
                  title={'Password'} 
                  type={passwordInputType}
                  iconEye={ToggleIcon}
                  eye={true}
                  error={errors.password && errors.password[0]}
                />

                <InputFeild  
                  handleChange={handleChange} 
                  value={formData.password_confirmation} 
                  name={'password_confirmation'} 
                  placeholder="••••••••" 
                  title={'Password Confirmation'} 
                  type={passwordInputTypeConfirm}
                  iconEye={ToggleIconConfirm}
                  eye={true}
                />

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      onChange={(e) => setIsTermsAccepted(e.target.checked)}
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{' '}
                      <Link
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        to={'/terms-and-conditions'}
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <FormButton isDisabled={!isTermsAccepted} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to={'/login'}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
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

function FormHeading() {
  return (
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Create an account
    </h1>
  );
}

function FormButton({isDisabled}) {
  return (
    <button
      type="submit"
      className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isDisabled}
    >
      Create an account
    </button>
  );
}
