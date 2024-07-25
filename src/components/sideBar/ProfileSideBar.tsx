import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react"
import { ReactNode, createContext, useState } from "react"

type Props = {
    children:ReactNode
}
type SidebarContextType = {
  expanded: boolean;
};
export const SidebarContext = createContext<SidebarContextType>({
  expanded:true
})
const ProfileSideBar = ({children}:Props) => {
  const [expanded,setExpanded] = useState(true)

  return (
    <aside className="h-full">
      <nav className={`h-full flex flex-col border-r shadow-sm}`}>
        <div className="p-4 pb-2 flex justify-between items-center ">
        <button onClick={()=> setExpanded((curr)=> !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">

           {expanded? <ChevronFirst/>:<ChevronLast/> }
        </button>
        </div>
        <SidebarContext.Provider value={{expanded}}>
        <ul className="flex-1 px-3">
            {children}
        </ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
            <img src="" alt="avatar" className="w-10 h-10 rounded-md" />
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`} >
                <div  className="leading-4">
                <h4 className="font-semibold">Athul ramesh</h4>
                <span className="text-xs text-gray-600">athulrameshan@gmail.com</span>
                </div>
                <MoreVertical size={20}/>
            </div>

        </div>
      </nav>
    </aside>
  )
}

export default ProfileSideBar
