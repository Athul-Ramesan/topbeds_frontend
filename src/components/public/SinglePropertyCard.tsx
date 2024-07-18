import React, { FC, useEffect, useState } from 'react'
import { IProperty } from '../../interface/IProperty';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { bookingApiInstance } from '../../config/instances';


interface SinglePropertyCardProps {
  property: IProperty;
}

const SinglePropertyCard: FC<SinglePropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const propertyId = property._id
  const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation(); // Stop propagation to prevent parent click event
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? property.images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation(); // Stop propagation to prevent parent click event
    setCurrentImageIndex((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1));
  };
  useEffect(() => {
    const fetchRatingAndReviews = async () => {
      try {
        const [ratingResponse, reviewsResponse] = await Promise.all([
          bookingApiInstance.get(`/review/rating/${propertyId}`),
          bookingApiInstance.get(`/review/properties/${propertyId}`)
        ]);

        setAverageRating(ratingResponse.data);
        setTotalReviews(reviewsResponse.data.length);
      } catch (error) {
        console.error('Error fetching rating and reviews:', error);
      }
    };

    fetchRatingAndReviews();
  }, [propertyId]);
  return (
    <div className="max-w-sm mx-auto h-96 bg-white shadow-lg rounded-lg overflow-hidden border-b border-primaryColor">
      <div className="relative">
        <div className='h-64'>

          <LazyLoadImage
            src={property.images[currentImageIndex]}
            alt={property.title}
            effect="blur"
            className="w-full h-full object-cover"
          />
        </div>
        {/* <img src={property.images[currentImageIndex]} alt={property.title} className="w-full h-64 object-cover" /> */}
        <button
          onClick={handlePrevClick}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full">
          &lt;
        </button>
        <button
          onClick={handleNextClick}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full">
          &gt;
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">★</span>
          <span className="text-xl font-semibold">{averageRating.toFixed(2)}</span>
          <span className="text-gray-600 ml-2">· {totalReviews} reviews</span>
        </div>
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.description}</p>
      </div>
    </div>
  )
}

export default SinglePropertyCard
