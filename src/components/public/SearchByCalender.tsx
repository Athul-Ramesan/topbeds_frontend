import {useState} from "react"; 
import Datepicker  from "react-tailwindcss-datepicker";

interface IDateRangeValue{
    startDate:Date
    endDate:Date
}
const SearchByCalender = () => {
    const [value, setValue] = useState<IDateRangeValue>({ 
        startDate: new Date(), 
        endDate: new Date(new Date().setMonth(11) )
        }); 
        
        const handleValueChange = (newValue:any) => {
        console.log("newValue:", newValue); 
        setValue(newValue); 
        } 
  
        
        return (
            <div className=" absolute bottom-4 left-14 right-20  ">
                
        <Datepicker placeholder={"Explore your vacation by picking your days"}
        value={value} 
        // disabled={true}
        inputClassName={"shadow-md shadow-black placeholder:text-black rounded-md focus:ring-0 font-normal"}
        onChange={handleValueChange} 
        /> 
        </div>
        );
  
}

export default SearchByCalender
