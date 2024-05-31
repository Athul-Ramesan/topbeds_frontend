import React from 'react'
import HeadingSingleProperty from './HeadingSingleProperty'
import ImageGallery from './ImageGallery'
import DetailsSection from './DetailsSection'
import AmenitiesSection from './AmenitiesSection'
import BookingSection from './BookingSection'

const SingleProperty = () => {
  return (
    <div className="font-sans">
    <HeadingSingleProperty />
    <ImageGallery />
    <DetailsSection />
    <AmenitiesSection />
    <BookingSection />
  </div>
  )
}

export default SingleProperty
