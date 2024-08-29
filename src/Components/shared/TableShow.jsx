import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import Skeleton from "react-loading-skeleton"

export default function TableShow({ caption, tableHeads }) {
  const [tableHeadsInner, setTableHeadsInner] = useState([])
  const { vehiclesPaginated, loading, vehicleMetas, vehicleLinks } = useOutletContext()
  const [vehiclesNew, setVehiclesNew] = useState(vehiclesPaginated || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(Math.ceil((vehicleMetas?.total || 1) / (vehicleMetas?.per_page || 1)))
  const [innerLoading, setInnerLoading] = useState(false)
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

  useEffect(() => {
    setTableHeadsInner(tableHeads || [])
  }, [tableHeads])

  useEffect(() => {
    if (currentPage !== 1) {
      fetchVehicles(currentPage)
    }
  }, [currentPage])

  const fetchVehicles = async (page) => {
    try {
      const token = localStorage.getItem('token')
      const headers = {
        Authorization: `Bearer ${token}`
      }
      setInnerLoading(true)
      const response = await fetch(`${apiEndpoint}/v1/vehicles?page=${page}`, { headers })
      const data = await response.json()
      setVehiclesNew(data.data)
      setTotalPages(Math.ceil(data.meta.total / data.meta.per_page))
      setInnerLoading(false)
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <table className="table-auto w-full border-collapse">
        <caption>{''}</caption>
        <thead className="bg-gray-100">
          <tr>
            {tableHeadsInner.map((tableHead, index) => (
              <th
                key={index}
                className={`${
                  index === 0 ? 'w-[100px]' : '' 
                } ${index === tableHeads.length - 1 ? 'text-right' : ''} p-2 border`}
              >
                {tableHead}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehiclesNew.map((vehicle, index) => (
            <tr key={vehicle.id} className="hover:bg-gray-50">
              {/* Index calculation adjusted for pagination */}
              <td className="border p-2">{index + 1 + (currentPage - 1) * vehicleMetas.per_page}</td>
              <td className="border p-2 capitalize">{innerLoading ? <Skeleton /> : (vehicle.station ? vehicle.station.name.replace('-', ' ') : 'Null')}</td>
              <td className="border p-2 font-medium">{innerLoading? <Skeleton /> : (vehicle.plate_number)}</td>
              <td className="border p-2">{innerLoading ? <Skeleton /> : (vehicle.association ? vehicle.association.name : 'Null')}</td>
              <td className="border p-2 capitalize flex justify-center">{innerLoading ? <Skeleton width={'30px'} /> : (vehicle.deployment_line ? vehicle.deployment_line.origin : 'Null')} - {innerLoading ? <Skeleton width={'30px'} /> : (vehicle.deployment_line ? vehicle.deployment_line.destination : 'Null')}</td>
              <td className="border p-2">{innerLoading ? <Skeleton /> : vehicle.code}</td>
              <td className="border p-2">{innerLoading ? <Skeleton /> : vehicle.level.replace('_', ' ').toUpperCase()}</td>
              <td className="border p-2">{innerLoading ? <Skeleton/> : vehicle.number_of_passengers}</td>
              <td className="border p-2 capitalize">{innerLoading ? <Skeleton /> : vehicle.car_type.replace('_', ' ')}</td>
              <td className="border p-2">
                {innerLoading ? <Skeleton/> : (new Date(vehicle.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric'
                }))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between text-xs mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:cursor-pointer hover:bg-bg-blue-500 p-3 rounded-md bg-blue-400 text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="hover:cursor-pointer hover:bg-bg-blue-500 p-3 rounded-md bg-blue-400 text-white"
        >
          Next <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </>
  )
}
