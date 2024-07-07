import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingApiInstance } from '../../../config/instances';
import { SinglePropertyDetailsContext } from '../../../context/SinglePropertyDetails';

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}



const Reviews: React.FC = () => {
  const {singleProperty} = useContext(SinglePropertyDetailsContext)
  const propertyId = singleProperty._id
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);

  useEffect(() => {
    const fetchRatingAndReviews = async () => {
      try {
        const [ratingResponse, reviewsResponse] = await Promise.all([
          bookingApiInstance.get(`/review/rating/${propertyId}`),
          bookingApiInstance.get(`/review/properties/${propertyId}`)
        ]);
        console.log("🚀 ~ fetchRatingAndReviews ~ ratingResponse:", ratingResponse)
        console.log("🚀 ~ fetchRatingAndReviews ~ reviewsResponse:", reviewsResponse)
        setAverageRating(ratingResponse.data);
        setReviews(reviewsResponse.data);
        setTotalReviews(reviewsResponse.data.length);
      } catch (error) {
        console.error('Error fetching rating and reviews:', error);
      }
    };

    fetchRatingAndReviews();
  }, [propertyId]);

  const toggleShowAllReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">★</span>
        <span className="text-xl font-semibold">{averageRating.toFixed(2)}</span>
        <span className="text-gray-600 ml-2">· {totalReviews} reviews</span>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: showAllReviews ? 'auto' : 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <AnimatePresence>
          {showAllReviews && reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-200 py-4"
            >
              <div className="flex justify-between items-center mb-2">
                
                <span className="font-semibold">{review.user.firstName}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`text-lg ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleShowAllReviews}
        className="mt-4 btn px-4 py-2 rounded"
      >
        {showAllReviews ? 'Hide Reviews' : 'Show All Reviews'}
      </motion.button>
    </div>
  );
};

export default Reviews;