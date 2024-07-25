
import { useState, useEffect, FC, ReactElement } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { bookingApiInstance } from '../../../config/instances';

interface GraphData {
  bookingsOverTime: { _id: string, count: number }[];
  revenueTrends: { _id: string, total: number }[];
  userGrowth: { _id: string, count: number }[];
}

interface GraphContainerProps {
  title: string;
  children: ReactElement;  // Ensuring children is a single ReactElement
}

const GraphComponent: FC = () => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bookingApiInstance.get('/dashboard/graphs');
        console.log("🚀 ~ fetchData graph ~ response:", response)
        setGraphData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching graph data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!graphData) {
    return <div className="text-center py-10">No data available</div>;
  }

  const GraphContainer: FC<GraphContainerProps> = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-4 bg-white rounded-lg shadow-lg mb-8"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </motion.div>
  );

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <GraphContainer title="Bookings Over Time">
        <LineChart data={graphData.bookingsOverTime}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </GraphContainer>

      <GraphContainer title="Revenue">
        <LineChart data={graphData.revenueTrends}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </GraphContainer>

      <GraphContainer title="User Growth">
        <LineChart data={graphData.userGrowth}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#ffc658" activeDot={{ r: 8 }} />
        </LineChart>
      </GraphContainer>
    </div>
  );
};

export default GraphComponent;

// import  { useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { motion } from 'framer-motion';
// import { bookingApiInstance } from '../../../config/instances';

// const GraphComponent = () => {
//   const [graphData, setGraphData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => { 
//       try {
//         const response = await bookingApiInstance.get('/dashboard/graphs');
//         console.log("🚀 ~ fetchData graphhhhhhhhhh~ response:", response)
//         setGraphData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching graph data:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   const GraphContainer = ({ title, children }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="w-full p-4 bg-white rounded-lg shadow-lg mb-8"
//     >
//       <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         {children}
//       </ResponsiveContainer>
//     </motion.div>
//   );

//   return (
//     <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       <GraphContainer title="Bookings Over Time">
//         <LineChart data={graphData.bookingsOverTime}>
//           <XAxis dataKey="_id" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </GraphContainer>

//       <GraphContainer title="Revenue">
//         <LineChart data={graphData.revenueTrends}>
//           <XAxis dataKey="_id" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="total" stroke="#82ca9d" activeDot={{ r: 8 }} />
//         </LineChart>
//       </GraphContainer>

//       <GraphContainer title="User Growth">
//         <LineChart data={graphData.userGrowth}>
//           <XAxis dataKey="_id" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="count" stroke="#ffc658" activeDot={{ r: 8 }} />
//         </LineChart>
//       </GraphContainer>

//       {/* <GraphContainer title="Occupancy Rates">
//         <BarChart data={graphData.occupancyRates}>
//           <XAxis dataKey="_id" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="occupancyRate" fill="#8884d8" />
//         </BarChart>
//       </GraphContainer> */}
//     </div>
//   );
// };

// export default GraphComponent;