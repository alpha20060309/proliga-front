'use client'

import * as React from 'react'
import { addDays, format, setYear } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDate } from 'app/utils/formatDate.util'

export function DatePickerWithPresets() {
  const [date, setDate] = React.useState(Date.now())

  const currentYear = new Date().getFullYear()
  const fromYear = currentYear - 100

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline-solid'}
          className={cn(
            'w-72 justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-1" />
          {date ? formatDate(date, 'news') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="flex gap-2">
          <Select onValueChange={() => {}}>
            <SelectTrigger className="h-8 w-1/2 ring-1">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="Month">
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i + 1}>
                  {format(addDays(new Date(fromYear, i), 1), 'LLL')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(event) => setYear(date, event)}>
            <SelectTrigger className="h-8 w-1/2">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent position="popper">
              {Array.from({ length: 100 }, (_, i) => (
                <SelectItem key={i} value={i + fromYear}>
                  {i + fromYear}
                </SelectItem>
              )).reverse()}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            className={''}
            onSelect={setDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
