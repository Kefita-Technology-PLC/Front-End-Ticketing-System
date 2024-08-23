
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/dist'

function TopHeaders({topTitle, navLinks, navigation}) {
  const [innerNavigation, setInnerNavigation] = useState([])
  useEffect(()=>{
    setInnerNavigation(navigation || [{
      id: 1,
      name: 'Vehicles',
      current: true,
    },{
      id: 2,
      name: 'Name',
      current: false,
    },{
      id: 3,
      name: 'Employe',
      current: false,
    }])
  })
  return (
    <div className='mb-3'>

      <div className='flex justify-between items-center p-2'>
        <h1 className='px-4 text-[23px] font-semibold'>{topTitle}</h1>
        <button className=' text-xs p-2 outline outline-1 rounded-md gap-x-1 flex items-center bg-blue-500 text-white'><FontAwesomeIcon icon={faPlus} />  Add Vehicles</button>
      </div>

      <hr  className='h-1'/>

      <div className='flex gap-x-16 px-5 py-2 text-[15px]'>
        {
          innerNavigation.map((navigation, index)=>(
            <Link to={'/'} className={navigation.current? ' border-b-[2px] border-blue-500':''} key={navigation.id}>{navigation.name}</Link>
          ))
        }
      </div>
    </div>
  )
}

export default TopHeaders
