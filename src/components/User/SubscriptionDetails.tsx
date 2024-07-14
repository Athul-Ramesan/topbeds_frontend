import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useAppSelector } from '../../redux/store';

interface Subscription {
  plan: string;
  startDate: string;
  expiryDate: string;
  active: boolean;
  stripeSessionId: string;
}

const SubscriptionDetails: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const subscription = useAppSelector(state => state.user.user?.subscriptions) as Subscription[] | undefined;

  console.log("🚀 ~ SubscriptionDetails ~ subscription:", subscription);

  // Function to format date
  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to calculate days left
  const daysLeft = () => {
    if (!subscription || !subscription[0]?.expiryDate) return 'N/A';
    const now = new Date();
    const expiry = new Date(subscription[0].expiryDate);
    const diff = expiry.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Subscription</h2>
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700">Plan: <span className="text-blue-600">{subscription?.[0]?.plan ?? 'N/A'}</span></p>
        <p className="text-md text-gray-600">Expires on: {formatDate(subscription?.[0]?.expiryDate)}</p>
        <p className="text-md text-gray-600">Days left: {daysLeft()}</p>
      </div>

      <div className="mt-4">
        <button
          className="flex items-center justify-between w-full text-left text-gray-700 font-semibold focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Subscription Details</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl"
          >
            🔽
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-2 p-4 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-600">Billing Cycle: Monthly</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubscriptionDetails;


// import { AnimatePresence, motion } from 'framer-motion';
// import { FC, useEffect, useState } from 'react';
// import { useAppSelector } from '../../redux/store';



// const SubscriptionDetails = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const subscription = useAppSelector(state=>state.user.user?.subscriptions)
//     console.log("🚀 ~ SubscriptionDetails ~ subscription:", subscription)
   
//     console.log("🚀 ~ SubscriptionDetails ~ subscription:", subscription)
    

//     // Function to format date
//     const formatDate = (date:string) => {
//         if (!date) return 'N/A';
//         return new Date(date).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric'
//         });
//       };

//     // Function to calculate days left
//     const daysLeft = () => {
//         if (!subscription[0]?.expiryDate) return 'N/A';
//         const now = new Date();
//         const expiry = new Date(subscription[0]?.expiryDate);
//         const diff = expiry - now;
//         return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
//       };

//     return (
//         <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Subscription</h2>
//             <div className="mb-4">
//                 <p className="text-lg font-semibold text-gray-700">Plan: <span className="text-blue-600">{subscription[0]?.plan}</span></p>
//                 <p className="text-md text-gray-600">Expires on: {formatDate(subscription[0]?.expiryDate)}</p>
//                 <p className="text-md text-gray-600">Days left: {daysLeft()}</p>
//             </div>

//             {/* <button
//                 className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
//                 onClick={() => console.log('Cancel subscription')}
//             >
//                 Cancel Subscription
//             </button> */}

//             <div className="mt-4">
//                 <button
//                     className="flex items-center justify-between w-full text-left text-gray-700 font-semibold focus:outline-none"
//                     onClick={() => setIsOpen(!isOpen)}
//                 >
//                     <span>Subscription Details</span>
//                     <motion.span
//                         animate={{ rotate: isOpen ? 180 : 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="text-xl"
//                     >
//                         🔽
//                     </motion.span>
//                 </button>

//                 <AnimatePresence>
//                     {isOpen && (
//                         <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="overflow-hidden"
//                         >
//                             <div className="mt-2 p-4 bg-gray-100 rounded-md">
//                                 {/* <p className="text-sm text-gray-600">Subscription ID: {id}</p> */}
//                                 {/* <p className="text-sm text-gray-600">Start Date: {formatDate(subscription[0]?.startDate)}</p> */}
//                                 <p className="text-sm text-gray-600">Billing Cycle: Monthly</p>
//                                 {/* <p className="text-sm text-gray-600">Next Billing Date: {formatDate(nextBillingDate)}</p> */}
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default SubscriptionDetails;