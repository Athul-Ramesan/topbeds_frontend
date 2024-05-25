import React from 'react'

const PropertyList = ({properties}) => {
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property._id} className=" rounded ">
            <img src={property.images[0]} alt={property.title} className="w-full h-60 object-cover rounded" />
            <p className="font-semibold ">{property.title}</p>
            <p>{property.address.split(" ")[1]}</p>
           
          </div>
        ))}
      </div>
  )
}

export default PropertyList
