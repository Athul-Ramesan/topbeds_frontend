import React from 'react';
import { motion } from 'framer-motion';

const data = [
  { label: 'A', value: 50 },
  { label: 'B', value: 80 },
  { label: 'C', value: 45 },
  { label: 'D', value: 60 },
  { label: 'E', value: 70 }
];

const BarChart = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '300px', width: '100%', margin: '50px 0' }}>
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${item.value}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ width: '20px', background: 'teal', margin: '0 10px' }}
        />
      ))}
    </div>
  );
};

export default BarChart;
