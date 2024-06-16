import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const Layout = () => {
  return (
    <>
    <div className='sm:hidden md:block flex p-4 border-b-0 shadow-md z-10 flex-col w-full bg-gray-100 fixed'>
      <Header/>
      
    </div>
    <div className='pt-16 overflow-hidden'>
      <Outlet/>
    </div>
    </>
  )
}

export default Layout
