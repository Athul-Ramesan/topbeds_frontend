// ReviewFormModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import StarRating from '../StarRating';
import { bookingApiInstance } from '../../config/instances';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  userId: string;
  onReviewSubmitted: () => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  isOpen,
  onClose,
  listingId,
  userId,
  onReviewSubmitted,
}) => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: '',
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .required('Rating is required')
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating must be at most 5'),
      comment: Yup.string()
        .required('Comment is required')
        .min(10, 'Comment must be at least 10 characters'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await bookingApiInstance.post('/reviews', {
          user: userId,
          listing: listingId,
          rating: Number(values.rating),
          comment: values.comment,
        });
        resetForm();
        onReviewSubmitted();
        onClose();
      } catch (error) {
        console.error('Error submitting review:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                 <StarRating
                  rating={formik.values.rating}
                  onRatingChange={(rating) => formik.setFieldValue('rating', rating)}
                />
                {formik.touched.rating && formik.errors.rating && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.rating}</div>
                )}
              </div>
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                  className="textarea textarea-bordered w-full"
                ></textarea>
                {formik.touched.comment && formik.errors.comment && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.comment}</div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn btn-primary"
                >
                  {formik.isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewFormModal;