import { FC } from 'react'



interface ToolTipAtBottomProps {
    toolTipText: string;
    showToolTip:boolean
  }
const ToolTipAtBottom:FC<ToolTipAtBottomProps> = ({toolTipText,showToolTip}) => {
  return (
    <div className="relative">

          {showToolTip && (
            
            <div className={`absolute top-full delay-100 duration-300  mb-2 w-auto p-2 text-sm text-white bg-gray-800 rounded shadow-lg `}>
              {toolTipText}
            </div>
          )}

          </div>
  )
}

export default ToolTipAtBottom
