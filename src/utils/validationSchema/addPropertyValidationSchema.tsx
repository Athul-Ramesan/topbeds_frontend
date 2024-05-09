import * as Yup from "yup"

export const addPropertyValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    address: Yup.string().required('Address is required'),
    // location: Yup.object().shape({
    //   city: Yup.string().required('City is required'),
    //   state: Yup.string().required('State is required'),
    //   country: Yup.string().required('Country is required'),
    // }),
    amenities: Yup.array().of(Yup.string()).min(1, 'At least one amenity is required'),
    houseRules: Yup.string().required('house rule is required'),
    // price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    images: Yup.array().of(Yup.string()).min(1, 'At least one image is required'),
    bedrooms: Yup.number().required('Number of bedrooms is required').integer('Number of bedrooms must be an integer').positive('Number of bedrooms must be a positive number'),
    bathrooms: Yup.number().required('Number of bathrooms is required').integer('Number of bathrooms must be an integer').positive('Number of bathrooms must be a positive number'),
    checkIn: Yup.string().required("CheckIn time required"),
    checkOut: Yup.string().required("CheckOut time required"),
    maxGuests: Yup.number().required('Maximum number of guests is required').integer('Maximum number of guests must be an integer').positive('Maximum number of guests must be a positive number'),
    
})