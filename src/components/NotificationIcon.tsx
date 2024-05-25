import React, { FC } from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'

interface NotificationIconProps{
    className :string
}

const NotificationIcon:FC <NotificationIconProps> = ({className}) => {
  return (
   <>
   <div className={`bg-primaryColor hover:bg-bgaccent transition inline-block rounded-full p-1 ${className} `}>
                <IoIosNotificationsOutline className="transition"
                    onMouseOver={({ target }) => (target as HTMLElement).style.color = "white"}
                    onMouseOut={({ target }) => (target as HTMLElement).style.color = "black"}
                    size={30} />
            </div>
   </>
  )
}

export default NotificationIcon
