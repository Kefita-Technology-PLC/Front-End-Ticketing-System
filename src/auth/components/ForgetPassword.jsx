import React, { useState } from 'react';
import axios from 'axios';
import InputFeild from './Input';
import FormButton from './FormButton';
import Logo from './Logo';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false); // State to manage page transition

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/forgot-password`, {
        email,
      });

      setMessage(response.data.status);
      setIsEmailSent(true);
    } catch (error) {
      // Handle error if any
      if (error.response && error.response.data.errors) {
        setError(error.response.data.errors.email);
       
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  // Function to handle "Re-send Email" action
  const handleResendEmail = () => {
    setIsEmailSent(false);
    setError('');
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo path={'/'} title={'Ticketing System'}/>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            {isEmailSent ? (
              // Success Message Page
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {message}
                </h1>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  If you didn't receive the email, click below to re-send.
                </p>
                <button
                  onClick={handleResendEmail}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Re-send Email
                </button>
              </div>
            ) : (
              // Forgot Password Form
              <>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Forget Password
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <InputFeild
                    title="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    handleChange={handleChange}
                    error={error}
                  />
                  <FormButton text={'Send Email Link'}/>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
