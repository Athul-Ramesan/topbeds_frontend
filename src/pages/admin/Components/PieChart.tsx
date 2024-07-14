import { Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Total Users', 'Total Hosts', 'Active Users', 'Blocked Users'],
  datasets: [
    {
      data: [300, 50, 200, 100], // Example data
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const PieChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      style={{ margin: '0 auto' }}
    >
      <Pie data={data} />
    </motion.div>
  );
};

export default PieChart;
