import React from 'react'

function ErrorMessage({error}) {
  return (
    <>
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </>
  )
}

export default ErrorMessage
