import { FaBedPulse } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const TopbedsLogo = () => {
  return (
    <>
      <Link to={"/index"} className="flex gap-1 items-center">
        <FaBedPulse size={20} className="text-primaryColor" />
        <span className="font-bold text-xl">Topbeds</span>
      </Link>
    </>
  )
}

export default TopbedsLogo
