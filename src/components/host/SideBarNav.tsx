import { FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface SideBarNavProps{
    navItem:string,
    icon:ReactNode
}

const SideBarNav:FC<SideBarNavProps> = ({navItem,icon}) => {
  return (
    <div>
      <NavLink to="/host"  className="side-nav-link-sp border-y-2 border-primaryColor rounded-xl my-2">
        {icon}
      {navItem}
      </NavLink>
    </div>
  )
}

export default SideBarNav
