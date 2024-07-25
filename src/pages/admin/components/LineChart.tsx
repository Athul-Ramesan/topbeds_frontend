// LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data: ChartData<'line'> = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Bookings',
      data: [30, 45, 60, 70, 90, 100, 120, 130, 150, 170, 190, 200], // Example data
      fill: false,
      backgroundColor: '#36A2EB',
      borderColor: '#36A2EB',
    },
  ],
};

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Bookings',
      },
    },
  },
};

const LineChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      style={{ width: '75%', margin: '0 auto' }}
    >
      <Line data={data} options={options} />
    </motion.div>
  );
};

export default LineChart;
