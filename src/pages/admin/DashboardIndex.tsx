import BarChart from './Components/BarChart'
import Chart from './Components/BarChart'
import LineChart from './Components/LineChart'
import PieChart from './Components/PieChart'
import Stats from './Components/Stats'
import Table from './Components/Table'

const DashboardIndex = () => {
  return (
    <div className='m-4 w-full overflow-y-auto overflow-x-hidden'>
      <div className='flex justify-center w-full py-4'>
      <Stats/>
      </div>
      <div className='flex gap-4 w-full border-2 rounded-md py-4 my-2'>
        <div className='w-2/3'>
        <LineChart/>
        </div>
        <div className='w-1/3'>
        <PieChart />
        </div>
      </div>
      <div className='border-2'>
        <p className='font-sans font-bold px-4 py-2'>Top Hosts</p>
      <Table/>
      </div>
    </div>
  )
}

export default DashboardIndex
