import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

function AddAssociation() {
  const {stations} = useOutletContext()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    establishment_date: '',
    amharic: false,
  })

  const handleSubmit = () =>{
    
  }

  return (
    <form onSubmit={handleSubmit} className=''>

    </form>
  )
}

export default AddAssociation
