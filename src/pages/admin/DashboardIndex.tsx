import GraphComponent from './Components/GraphComponent'
import RecentActivitiesTable from './Components/RecentActivitiesTable'
import Stats from './Components/Stats'

const DashboardIndex = () => {
  return (
    <div className='m-4 w-full overflow-y-auto overflow-x-hidden'>
      <p className='font-mono font-extrabold text-2xl text-red-600'> Welcome Dashboard</p>
      <div className='flex justify-center w-full py-4'>
      <Stats/>
      </div>
      <div className='flex gap-4 w-full border-2 rounded-md py-4 my-2'>
        <GraphComponent/>
      </div>
      {/* <div className='border-2'>
       
      </div> */}
      <RecentActivitiesTable/>
    </div>
  )
}

export default DashboardIndex
