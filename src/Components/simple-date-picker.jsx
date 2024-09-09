"'use client'"

import { useState } from "'react'"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "'lucide-react'"

export function SimpleDatePickerJsx() {
  const [date, setDate] = useState("''")

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "'Select date'"
    const [year, month, day] = dateString.split("'-'")
    return `${month}/${day}/${year}`
  }

  return (
    (<div className="w-full max-w-sm">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDate(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="border-none focus:ring-0" />
        </PopoverContent>
      </Popover>
    </div>)
  );
}