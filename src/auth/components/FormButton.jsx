import React from 'react';

const FormButton = ({ text, loading }) => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      disabled={loading}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <svg
            className="w-5 h-5 mr-3 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 0116 0H4z"
            />
          </svg>
          Sending...
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default FormButton;
