import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import HostPropertySingleProvider, { HostPropertySingleContext } from '../../context/HostPropertySingleContext'
import { IProperty } from '../../interface/IProperty'


const PropertyList = ({ properties}) => {
  const {propertyId} = useParams()
  const {setHostProperty} = useContext(HostPropertySingleContext)

  useEffect(() => {
    const currentProperty = properties.find(property  => property.id === propertyId);
    if (currentProperty) {
      setHostProperty(currentProperty);
    }
  }, [propertyId, properties, setHostProperty]);

  return (
    <>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <Link
              to={`/host/manage-listing/${property._id}`}
              onClick={()=>{
                setHostProperty(property)
              }}
              key={property._id} className=" rounded ">
              <img src={property.images[0]} alt={property.title} className="w-full h-60 object-cover rounded" />
              <p className="font-semibold ">{property.title}</p>
              <p>{property.address.split(" ")[1]}</p>

            </Link>
          ))}
        </div>
      
    </>
  )
}

export default PropertyList
