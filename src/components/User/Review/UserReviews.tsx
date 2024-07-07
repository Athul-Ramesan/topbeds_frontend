// UserReviews.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppSelector } from '../../../redux/store';
import { bookingApiInstance } from '../../../config/instances';

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  listing: {
    _id: string;
    title: string;
    images: string[];
  };
}



const UserReviews: React.FC = () => {
  const {user} = useAppSelector(state=>state.user)
  const userId = user?._id
  console.log("🚀 ~ userId:😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊😊", userId)
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await bookingApiInstance.get(`/review/user/${userId}`);
        setReviews(response.data);
        console.log("🚀 ~ fetchReviews ~ response:", response)
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [userId]);

  if (isLoading) {
    return <div className="text-center">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven't written any reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{review.listing.title}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{review.comment}</p>
                <p className="text-sm text-gray-500">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
              {review.listing.images && review.listing.images.length > 0 && (
                <img
                  src={review.listing.images[0]}
                  alt={review.listing.title}
                  className="w-full h-48 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;