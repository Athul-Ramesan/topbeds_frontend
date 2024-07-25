import  {useEffect, useState } from 'react'
import SubscriptionModal from '../modal/SubscriptionModal'
import SubscriptionDetails from './SubscriptionDetails'
import { useAppSelector } from '../../redux/store'

const SubscriptionOption = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [hasSubscription, setHasSubscription] = useState(false)
  const handleClick = () => {
    console.log(hasSubscription,'has subscription')
    setModalOpen(true)
  }
  const subscriptions = useAppSelector(state => state.user.user?.subscriptions)
  console.log("🚀 ~ SubscriptionOption ~ subscriptions:", subscriptions)
  useEffect(()=>{
    if (subscriptions && subscriptions?.length  === 0) {
      setHasSubscription(false);
    } else {
      setHasSubscription(true);
    }

  },[subscriptions])
  return (
    <div className='flex flex-col'>

      {hasSubscription ? (

        <>

        <div className="container mx-auto p-4">
          <SubscriptionDetails />
        </div>
      </>
      ):(
        <>
        <SubscriptionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        <p>Upgrade now</p>
        <p>Get access to exclusive features and support</p>
        <button
          onClick={handleClick}
          className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-   
          2 px-4 rounded'>View Our Plans</button>
          </>
      )
    }


    </div>
  )
}

export default SubscriptionOption
