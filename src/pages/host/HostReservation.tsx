import { motion } from 'framer-motion';
import HostCalendar from './components/HostCalender';
import { useAppSelector } from '../../redux/store';

// interface HostReservationProps {
//   hostId: string;
// }

const HostReservation = () => {
    const {user} = useAppSelector(state=>state.user)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='h-full'
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className='font-semibold font-mono text-2xl text-gray-400 w-full'
      >
        Your Reservations
      </motion.h2>
      <div className='w-full h-full flex justify-center px-16 py-4'>
      <HostCalendar hostId={String(user?._id)} />
      </div>
    </motion.div>
  );
};

export default HostReservation;