import { useContext } from "react"
import HostPropertySingleDetail from "../../components/host/HostPropertySingleDetail"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"

const ArrivalGuidlines = () => {
  const{hostProperty } = useContext(HostPropertySingleContext)
    console.log("🚀 ~ HostPropertyDetail ~ hostProperty:", hostProperty)
    
  return (
    <div className=" flex flex-col gap-2  p-4 h-[410px] overflow-y-scroll overf mt-6 mx-5">
      
      <HostPropertySingleDetail contentHead="House Rules" contentText={`${hostProperty.houseRules}`} />

    </div>
  )
}

export default ArrivalGuidlines
