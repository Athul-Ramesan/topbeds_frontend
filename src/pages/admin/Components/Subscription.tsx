import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { subscriptionValidationShcema } from '../../../utils/validationSchema/subscriptionValidationScherma';
import axios from 'axios';
import toast from 'react-hot-toast';
import { scrollToTop } from '../../../utils/helpers/scrollToTop';

export interface ISubscriptionPlan {
  _id: string;
  name: string;
  validityPeriod: string;
  amount: string;
  discount?: string;
  description?: string;
  isActive: boolean;
}

const Subscription: React.FC = () => {
  const [plans, setPlans] = useState<ISubscriptionPlan[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("")
  const [initialValues, setInitialValues] = useState<Partial<ISubscriptionPlan>>({
    name: '',
    validityPeriod: "30",
    amount: "0",
    isActive: true,
    discount: "",
    description: ""
  })

  useEffect(() => {
    fetchAllPlans()
  }, [])
  const fetchAllPlans = async () => {
    try {
      const response = await axios.get('http://localhost:3003/subscription')
      setPlans(response.data)
      console.log("🚀 ~ fetchAllPlans ~ response:", response)

    } catch (error: any) {
      console.log("🚀 ~ fetchAllPlans ~ error:", error)

    }
  }
  const handleRemovePlan = async (id: string) => {
    console.log("🚀 ~ handleRemovePlan ~ id:", id)
    try {
      const response = await axios.delete(`http://localhost:3003/subscription/${id}`);
      if (response.data) {
        setPlans(plans.filter(plan => plan._id !== id));
        toast.success('Plan removed successfully');
      } else {
        console.error('Failed to remove plan');
        toast.error('Failed to remove plan. Please try again.');
      }
    } catch (error) {
      console.error('Error removing plan', error);
      toast.error('Failed to remove plan. Please try again.');
    }
  };
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleEditPlan = (id: string) => {
    setIsEditMode(true)


    const plan = plans.find((plan) => {
      console.log("🚀 ~ handleEditPlan ~ plan:", plan)
      return plan._id === id
    })
    if (plan) {
      const valuesToEdit = {
        name: plan.name,
        validityPeriod: plan.validityPeriod,
        amount: plan.amount,
        isActive: plan.isActive,
        discount: plan.discount,
        description: plan.description
      }
      console.log("🚀 ~ handleEditPlan ~ valuesToEdit:", valuesToEdit)
      setEditId(id)
      setInitialValues(valuesToEdit)
      console.log('Before calling scrollToTop');
      setTimeout(() => {
        scrollRef && scrollRef.current && scrollRef?.current.scrollTo({ top: 0, behavior: "smooth" })
      }, 0)
      console.log('After calling scrollToTop');
    } else {
      toast.error('something went wrong selecting the plan for edit, please try again')
    }

  }
  const handleSubmit = async (values: Partial<ISubscriptionPlan>, { resetForm }: { resetForm: () => void }) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    try {
      let response: any
      if (isEditMode) {
        console.log(values._id, 'values id')
        response = await axios.patch(`http://localhost:3003/subscription/${editId}`, values);
        console.log("🚀 ~ handleSubmit ~ edit response:", response)
      } else {
        response = await axios.post('http://localhost:3003/subscription/create', values);
        console.log("🚀 ~ handleSubmit ~ response:", response);
      }

      if (response.data) {
        if (isEditMode) {
          const newPlan = response.data
          const updatedPlans = plans.map((plan) => {
            if (plan._id === newPlan._id) {
              return newPlan;
            }
            return plan;
          });
          setPlans(updatedPlans);
          toast.success('Plan edited successfully');
          setIsEditMode(false)
          setEditId('')
          setInitialValues({
            name: '',
            validityPeriod: "30",
            amount: "0",
            isActive: true,
            discount: "",
            description: ""
          })
        } else {
          setPlans(prev => [...prev, response.data]);
          toast.success('Plan added successfully');
        }
        console.log('here before reseting')
        resetForm();
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form', error);
      toast.error('Failed to add plan. Please try again.');
    }


    
  };


  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen overflow-y-auto" ref={scrollRef} >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Subscription Management</h1>



      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Plan</h2>
        <Formik initialValues={initialValues} enableReinitialize validationSchema={subscriptionValidationShcema} onSubmit={handleSubmit}>
          {() => (
            <Form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Plan Name"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="validityPeriod"
                    placeholder="Validity Period (days)"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="validityPeriod" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="amount" component="div" className="text-red-600 text-sm" />
                </div>
                <div>
                  <Field
                    type="text"
                    name="discount"
                    placeholder="Discount (%)"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <ErrorMessage name="discount" component="div" className="text-red-600 text-sm" />
                </div>
              </div>
              <div>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={3}
                />
                <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
              </div>
              <button type="submit" className={`text-white px-4 py-2 rounded hover:bg-leafGreenMinimal bg-none transition duration-300  ${isEditMode ? 'bg-orange-400' : "bg-gray-700"}`}>
                {isEditMode ? '' : (<PlusIcon className="h-5 w-5 inline-block mr-2" />)}
                {isEditMode ? "Update" : " Add Plan"}
              </button>
            </Form>
          )}
        </Formik>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (

          <div key={plan._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{plan.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold text-gray-800">₹{plan.amount}</p>
                  <p className="text-sm text-gray-500">per {plan.validityPeriod} days</p>
                </div>
                {plan.discount && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded">
                    {plan.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end">
              <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                <PencilIcon onClick={() => handleEditPlan(plan._id)} className="h-5 w-5" />
              </button>
              <button onClick={() => handleRemovePlan(plan._id)} className="text-red-600 hover:text-red-900">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
