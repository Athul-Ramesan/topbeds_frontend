import React, { useState, useEffect } from 'react';
import Datepicker, { DateRangeType, DateValueType } from 'react-tailwindcss-datepicker';
import { IProperty } from '../../../../interface/IProperty';

interface PropertyCalendarProps {
  property: IProperty;
  date: any,
  setDate: (date: any) => void;
}

const PropertyCalendar: React.FC<PropertyCalendarProps> = ({ property,date,setDate }) => {

  const [disabledDates, setDisabledDates] = useState<DateRangeType[]>([]);
  const [dateConfigs, setDateConfigs] = useState<Record<string, { className: string }>>({});

  useEffect(() => {
    if (property.availability) {
      const unavailableDateRanges: DateRangeType[] = [];
      const newDateConfigs: Record<string, { className: string }> = {};

      property.availability.forEach(period => {
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);

        if (!period.available) {
          unavailableDateRanges.push({
            startDate: start.toISOString().split('T')[0],
            endDate: end.toISOString().split('T')[0]
          });
        }

        for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
          const dateString = day.toISOString().split('T')[0];
          newDateConfigs[dateString] = {
            className: period.available ? 'bg-green-200' : 'bg-red-200'
          };
        }
      });

      setDisabledDates(unavailableDateRanges);
      setDateConfigs(newDateConfigs);
    }
  }, [property.availability]);

  const handleValueChange = (newValue: DateValueType) => {
    console.log('handle value change called')
    setDate(newValue);
  };

  return (
    <Datepicker
      placeholder={"Select check-in and check-out dates"}
      value={date}
      onChange={handleValueChange}
      inputClassName="shadow-md bg-white placeholder:text-green-500 text-green-600 rounded-md focus:ring-0 font-normal"
      disabledDates={disabledDates}
      configs={{
        dateFormat: "yyyy-MM-dd",
        ...dateConfigs
      }}
    />
  );
};

export default PropertyCalendar;