import { useEffect, useState } from "react"
import { axiosInstance } from "../../config/instances"
import ImageCard from "../../components/public/ImageCard"

const AllProperties = () => {
    const [properties, setProperties] = useState([])
    
    useEffect(()=>{
        axiosInstance.get('/property/get-all-properties')
        .then((response) => {
            console.log("🚀 ~ .then ~ response:", response)
            const properties = response.data?.data
            setProperties(properties)
        })
        .catch(err=>{
            console.log("🚀 ~ .catch ~ err:", err)
        })
        
    },[])
    console.log(properties,'properties');
    
  return (
    <div className="mt-10">
    <ImageCard properties={properties}/>
    </div>
  )
}

export default AllProperties
