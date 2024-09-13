import axios from "axios";
import { useBlur } from "../contexts/BlurContext";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import FormInputSelect from "../inputs/FormInputSelect";
import { Button } from "@headlessui/react";

export default function AddMoreStation({handleX, handleSubmit, formData, errors, handleChange, loading}){

  const {isFormVisible} = useBlur()
  const formRef = useRef(null)
  const [stations, setStations] = useState()
  const [loadingInner, setLoadingInner] = useState()

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [color] = useState("#ffffff")

  useEffect(()=>{

    const fetchData = async()=>{
      try{
        const token = localStorage.getItem('token')
        const headers = {
          Authorization: `Bearer ${token}`
        }
        const response = await axios.get(`${apiEndpoint}/v1/stations-all`, {headers})
  
        console.log(response)
  
      }catch{
  
      }
    }
    fetchData()
  }, [])

  return (
    <div className={`p-3 rounded-md fixed top-[30px] shadow-lg bg-white z-[100] left-1/2 transform -translate-x-1/2 blur-0 ${isFormVisible? '': 'hidden '}`}>

        { loading &&       
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        }

        {!loading && 
        <form onSubmit={handleSubmit}   ref={formRef} id='edit-form'>
          <div className='flex justify-between p-3'>
            <h2 className='text-xl font-semibold'>Edit Vehicle</h2>
            <span onClick={handleX}><FontAwesomeIcon icon={faX} className=' hover:cursor-pointer' /></span>
          </div>

          <div className="flex m-7 justify-around gap-7">
            <div className="flex flex-col gap-2 w-full border-r-[2px] pr-5">
              <FormInputSelect
                name="station_name"
                value={formData.station_name}
                handle={handleChange}
                error={errors.station_name}
                optionValue={stations}
                label="Choose a Station"
                startValue="Select a station"
                isName={true}
              />

            </div>
          </div>

          <div className="p-3 pl-8">
            {/* <Toast ref={refValue} /> */}
            <Button
              type="submit"
              form='edit-form'
              severity='success'
              onClick={handleSubmit}
              className="btn text-white bg-blue-500 text-[15px] btn-primary mr-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-xs"
            >
              Add Station
            </Button>
          </div>
        </form>}
    </div>
  )
}