import React, { ChangeEvent, FormEvent, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from './store';
// import { updatePropertyDetails, addImage } from './propertySlice';
import ImageUploader from './ImageUploader';
import FetchCountryStateCity from '../../components/host/SelectLocation';
import { ErrorMessage, Field, FieldArray, Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup'

interface PropertyFormProps { }

interface LocationOption {
  address: string;
  city: string;
  state: string;
  country: string;
}
interface FormValues {
  title: string;
  description: string;
  location: LocationOption;
  amenities?: string[];
  houseRules?: string[];
  price: number;
  images: string[]
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
}
const initialValues = {
  title: 'Athul Rameshan',
  description: '',
  location: {
    address: '',
    city: '',
    state: '',
    country: ''
  },
  amenities: [],
  houseRules: [],
  price: 0,
  images: [],
  bedrooms: 2,
  bathrooms: 2,
  maxGuests: 2
}
const propertyValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.object().shape({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('Country is required'),
  }),
  amenities: Yup.array().of(Yup.string()).min(1, 'At least one amenity is required'),
  houseRules: Yup.array().of(Yup.string()).min(1, 'At least one house rule is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
  images: Yup.array().of(Yup.string()).min(1, 'At least one image is required'),
  bedrooms: Yup.number().required('Number of bedrooms is required').integer('Number of bedrooms must be an integer').positive('Number of bedrooms must be a positive number'),
  bathrooms: Yup.number().required('Number of bathrooms is required').integer('Number of bathrooms must be an integer').positive('Number of bathrooms must be a positive number'),
  maxGuests: Yup.number().required('Maximum number of guests is required').integer('Maximum number of guests must be an integer').positive('Maximum number of guests must be a positive number'),
});

const PropertyForm: React.FC<PropertyFormProps> = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const { setFieldValue } = useFormikContext();

  const onSubmit = (values: FormValues) => {

    console.log(values);

  }
  const handleLocationSelect = (country: string, state: string, city: string) => {
    setSelectedCountry(country);
    setSelectedState(state);
    setSelectedCity(city);

    setFieldValue('location.country', country);
    setFieldValue('location.state', state);
    setFieldValue('location.city', city);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={propertyValidationSchema} onSubmit={onSubmit} className="max-w-md mx-auto">
      {({ values }) => (

        <Form>

          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              Title
            </label>
            <Field
              type="text"
              id="title"
              // value={}
              name="title"
              // onChange={handleTitleChange}

              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <ErrorMessage component="div" name='title' className="text-red-900" />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Description
            </label>
            <Field
              as="textarea"
              id="description"
              // onChange={handleDescriptionChange}
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <ErrorMessage component="div" name='description' className="text-red-900" />
          </div>
          <FetchCountryStateCity onLocationSelect={handleLocationSelect} />
          <FieldArray name="amenities">
            {({ push, remove }) => (
              <div>
                <label htmlFor="amenities">Amenities</label>
                {values.amenities.map((_, index) => (
                  <div key={index}>
                    <Field name={`amenities.${index}`} type="text" />
                    <button type="button" onClick={() => remove(index)}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type='button' onClick={() => push('')}>Add Amenity</button>
              </div>
            )}
          </FieldArray>
          <FieldArray name='houseRules' >
            {({ push, remove }) => (
              <div>
                <label htmlFor="houseRules">House Rules</label>
                {values.houseRules.map((_, index) => (
                  <div key={index}>
                    <Field name={`houseRules.${index}`} type="text" />
                    <button type='button' onClick={() => remove(index)}>Remove</button>
                  </div>
                ))}
                <button type='button' onClick={() => push('')}>
                  Add Rule
                </button>
              </div>
            )}
          </FieldArray>




          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default PropertyForm;