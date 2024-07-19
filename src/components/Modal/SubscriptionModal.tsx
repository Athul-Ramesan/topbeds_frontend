import React, { useEffect, useState } from 'react';
import { FaCheck, FaCrown, FaTv, FaMobile, FaTablet } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { useAppSelector } from '../../redux/store';
import axios from 'axios';
import { bookingApiInstance } from '../../config/instances';
import { stripeApiKey } from '../../config/config';

interface Plan {
  id: number;
  name: string;
  amount: number;
  features: string[];
  icon: React.ReactNode;
}


// const plans: Plan[] = [
//   {
//     id: 1,
//     name: 'Basic',
//     amount: 199,
//     features: ['Watch on mobile', 'SD quality', 'Limited content'],
//     icon: <FaMobile className="text-3xl text-blue-500" />,
//   },
//   {
//     id: 2,
//     name: 'Standard',
//     amount: 499,
//     features: ['Watch on TV and mobile', 'HD quality', 'All content'],
//     icon: <FaTv className="text-3xl text-green-500" />,
//   },
//   {
//     id: 3,
//     name: 'Premium',
//     amount: 999,
//     features: ['Watch on all devices', '4K quality', 'All content + Exclusive'],
//     icon: <FaCrown className="text-3xl text-yellow-500" />,
//   },
//   {
//     id: 4,
//     name: 'Premium',
//     amount: 999,
//     features: ['Watch on all devices', '4K quality', 'All content + Exclusive'],
//     icon: <FaCrown className="text-3xl text-yellow-500" />,
//   },
//   // Add more plans if needed
// ];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1
    }
  })
};
interface IPlan {
  _id: string,
  name: string,
  amount: number,
  description: string
}

const SubscriptionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<IPlan>({_id:'',description:'',name:'',amount:0});
  console.log("🚀 ~ selectedPlan:", selectedPlan)
  const [plans, setPlans] = useState<IPlan[]>([])
  console.log("🚀 ~ plans:", plans)
  const [loading, setLoading] = useState(false)
  const {user} = useAppSelector(state=>state.user)
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);
  useEffect(()=>{
     fetchPlans()
  },[])
  const fetchPlans=async()=>{
      const response = await    bookingApiInstance.get('/subscription/get')
      console.log("🚀 ~ fetchPlans ~ response:", response)
      setPlans(response.data)
  }
  const handleSubscribeClick =async ()=>{
        setLoading(true)
       try {
        const stripe =await loadStripe
        (stripeApiKey)
        const body = {
          name:selectedPlan.name,
          amount:selectedPlan.amount
        }
        localStorage.setItem('planId', selectedPlan._id)
        localStorage.setItem('userId',String(user?._id))

        const response = await bookingApiInstance.post("/subscription/make-payment-session", body)
        console.log("🚀 ~ handleSubscribeClick ~ response:", response)
        
        const resultFromStripe =  await stripe?.redirectToCheckout({
          sessionId:response.data
        })
        setLoading(false)
        console.log(resultFromStripe)
       } catch (error) {
        setLoading(false)
        console.log("🚀 ~ handleSubscribeClick ~ error:", error)
        
       }

  }
  return (

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1 ,backdropFilter: 'blur(5px)'}}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)'  }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50 backdrop:blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-auto max-w-3xl mx-auto my-6"
          >
            <div className="relative flex flex-col w-full border-2 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-2xl font-semibold text-white">Choose Your Plan</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={()=>{
                    setLoading(false)
                    onClose()
                  }
                  }
                >
                  <span className="text-white h-6 w-6 text-3xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto max-h-[70vh] overflow-y-auto">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan._id}
                      variants={itemVariants}
                      custom={index}
                      className={`card bg-base-100 shadow-xl cursor-pointer transition-all duration-300 ${
                        selectedPlan._id === plan._id? 'border-2 border-leafBackground-300 bg-black text-white' : ''
                      }`}
                      onClick={() => setSelectedPlan(plan)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="card-body">
                        <div className="flex items-center justify-between">
                          <h2 className="card-title">{plan.name}</h2>
                          <FaCrown className="text-3xl text-yellow-500" />
                        </div>
                        <p className="text-2xl font-bold my-2">₹{plan.amount}/month</p>
                        <ul className="space-y-2">
                          {/* {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheck className="text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))} */}
                          {plan.description}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid   rounded-b">
                <motion.button
                  className="btn bg-black text-white  hover:bg-leafBackground-300 hover:text-black"
                  type="button"
                  disabled={!selectedPlan}
                  onClick={handleSubscribeClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Loading...' : 'Subscribe'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubscriptionModal;