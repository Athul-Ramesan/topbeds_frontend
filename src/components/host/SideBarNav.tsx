import { FC, ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface SideBarNavProps{
    navItem:string,
    icon:ReactNode,
    linkTo: string
}

const SideBarNav:FC<SideBarNavProps> = ({navItem,icon,linkTo}) => {
  // const isActive = (match, location)=>{
  //   return location.pathname === linkTo
  // }
  return (
    <div>
      <NavLink to={linkTo}  className="side-nav-link-sp border-y-2 border-primaryColor rounded-xl my-2">
        {icon}
      {navItem}
      </NavLink>
    </div>
  )
}

export default SideBarNav
