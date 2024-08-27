import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Logo from './components/Logo';
import FormButton from './components/FormButton';
import usePasswordToggle from '../custom-hooks/usePasswordToggle'; // Assuming you have this custom hook
import InputFeild from './components/Input';

function ResetPassword() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams(); // To get the token from the URL
  const token = searchParams.get('token'); // Extracting token from URL
  const navigate = useNavigate()

  const [passwordInputType, ToggleIcon] = usePasswordToggle(); // For password toggle
  const [passwordInputTypeConfirm, ToggleIconConfirm] = usePasswordToggle(); // For confirm password toggle

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/reset-password`, {
        token: token, // Send token to the backend
        phone_no: phoneNumber,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      // Handle success, maybe redirect to the login page
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
       
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo path={'/'} title={'Ticketing System'} src={''} />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <FormHeading />
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                handleChange={(e) => setPassword(e.target.value)}
                value={password}
                name={'password'}
                placeholder="••••••••"
                title={'Password'}
                type={passwordInputType}
                iconEye={ToggleIcon}
                eye={true}
                error={errors.password && errors.password[0]}
              />

              <InputFeild
                handleChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                name={'password_confirmation'}
                placeholder="••••••••"
                title={'Password Confirmation'}
                type={passwordInputTypeConfirm}
                iconEye={ToggleIconConfirm}
                eye={true}
                error={errors.password_confirmation && errors.password_confirmation[0]}
              />

              <FormButton text="Reset Password" />

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Remember your password?{' '}
                <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;

function FormHeading() {
  return (
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
      Reset Your Password
    </h1>
  );
}

// function FormButton({ text }) {
//   return (
//     <button
//       type="submit"
//       className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//     >
//       {text}
//     </button>
//   );
// }
