import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

export default function TableShow({caption, tableHeads, vehicles}) {

  const [tableHeadsInner, setTableHeadsInner ]= useState([])
  const [vehiclesInner, setVehiclesInner ]= useState([])
  
  useEffect(()=>{
    setTableHeadsInner( tableHeads || []) 
    setVehiclesInner(vehicles || []) 
  },[tableHeads, vehicles])

  return (
    <Table>
      <TableCaption>{''}</TableCaption>
      <TableHeader>
        <TableRow>
        {tableHeadsInner.map((tableHead, index) => (
          <TableHead
            key={index}
            className={`${
              index === 0 ? 'w-[100px]' : '' 
            } ${
              index === tableHeads.length - 1 ? 'text-right' : ''
            }`}
          >
            {tableHead}
          </TableHead>
        ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehiclesInner.map((vehicle, index) => (
          <TableRow key={vehicle.id} className={'hover:text-white'}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className={' capitalize'}>{vehicle.station.name.replace('-', ' ')}</TableCell>
            <TableCell className="font-medium">{vehicle.plate_number}</TableCell>
            <TableCell>{vehicle.association.name}</TableCell>
            <TableCell className={'capitalize'}>{vehicle.deployment_line.origin} - {vehicle.deployment_line.destination}</TableCell>
            <TableCell>{vehicle.code}</TableCell>
            <TableCell >{vehicle.level.replace('_', ' ').toUpperCase()}</TableCell>
            <TableCell>{vehicle.number_of_passengers}</TableCell>
            <TableCell className={'capitalize'}>{vehicle.car_type.replace('_', ' ')}</TableCell>
            <TableCell>{
              new Date(vehicle.created_at).toLocaleDateString('en-US',{
                month: 'short',
                day: '2-digit',
                year: 'numeric'
              })
            
            }</TableCell>
            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
