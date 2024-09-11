import React from 'react'
import { Button } from '../ui/Button'

function FormButton({handleSubmit, text}) {
  return (
    <Button
      type="submit"
      form='edit-form'
      severity='success'
      onClick={handleSubmit || function(){}}
      className="btn text-white bg-blue-500 text-[15px] btn-primary mr-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
      >
      {text || "Update Vehicle"}
    </Button>
  )
}

export default FormButton
