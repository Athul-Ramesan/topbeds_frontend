import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";
import { capitalizeFirstLetter } from "../utils/helpers/capitaliseFirstLetter";


interface DropDownCommonProps {
    heading:string
    list:string[]
    setItem:(item:string)=>void
}
const DropDownCommon:FC<DropDownCommonProps> = ({heading,list,setItem}) => {
    const [selectedItem, setSelectedItem] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setSelectedItem(event.target.value);
      setItem(event.target.value)
    };
    const capitalisedHeading = capitalizeFirstLetter(heading)
    return (
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">{capitalisedHeading}</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedItem}
            onChange={handleChange}
            label={capitalisedHeading}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
                list.map((listItem)=>{
                    return (

                        <MenuItem value={listItem}>{listItem}</MenuItem>
                    )
                })
            }
          </Select>
        </FormControl>
       
      </div>
    );
  }

export default DropDownCommon
