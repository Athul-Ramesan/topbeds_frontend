import { useEffect, useState } from 'react'
import AddFacilityModalPage from '../../components/Modal/AddFacilityModalPage'
import { axiosInstance } from '../../config/instances'
import toast from 'react-hot-toast'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Trash } from 'lucide-react'
import ConfirmationModalNew from '../../components/Modal/ConfirmationModalNew'


export interface IFacility {
    _id:string
    name: string,
    icon:string
}
const Property = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [facililies, setFacilities] = useState<IFacility[]>([])
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)
    const [facilityId, setFacilityId] = useState('')
    const handleAddClick = ()=>{
        setIsModalOpen(true)
    }
    useEffect(()=>{
        const fetchFacilities = async()=>{
            const response = await axiosInstance.get('/property/get-property-facility')
            console.log("🚀 ~ fetchFacilities ~ response:", response)
            if(!response.data){
                toast.error('Something went wrong fetching the facilities')
            }
            const newFacilities = response.data.facilities
            setFacilities(newFacilities.reverse())
        }
        fetchFacilities()
    },[])

    const handleConfirm = async (facilityId:string)=>{
        try {
          console.log('inside handleConfirm')
            const response = await axiosInstance.delete(`/property/delete-property-facility/${facilityId}`)
            if(!response.data){
                toast.error('Something went wrong deleting the facility')
            }
            setFacilities((prev)=>{
                return[ prev.filter((facility)=>facility._id !== facilityId)].reverse()
            })
            toast.success(`succesfully deleted facility` )
        } catch (error:any) {
            console.log("🚀 ~ handleDeleteClick ~ error:", error)
            toast.error(error.response.data.message || 'Something went wrong try again')
        }
        }
        const handleOpenConfirmationModal =(facilityId:string)=>{
          setConfirmationModalOpen(true)
          setFacilityId(facilityId)
        }
  return (
      <div>
        <div className='flex justify-between mx-10 my-4'>
      <p className='text-xl font-bold'>Facility Management</p>
        <AddFacilityModalPage 
        setFacilities ={setFacilities}
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        />
        <ConfirmationModalNew 
        confirmationId={facilityId}
        onConfirm = {handleConfirm}
        open={confirmationModalOpen} 
        onClose={()=>setConfirmationModalOpen(false)}
        />
            <button className='btn bg-leafGreenMinimal ' onClick={handleAddClick}>add new</button>
        </div>

        <table className="table w-[750px] mx-10">
              <thead>
                <tr>
                  <th><span className='text-green-600 font-bold'>Sl.No</span></th>
                  <th className='text-green-600 font-bold'>Facility</th>    
                  <th className='text-red-500'>Action</th>
                </tr>
              </thead>
              <tbody>
                {facililies.reverse().map((facility,index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{facility.name}</div>
                        </div>
                      </div>
                    </td>
                    <td ><span className='text-2xl'>{facility.icon}</span></td>
                    <td >< Trash onClick={()=>handleOpenConfirmationModal(facility._id)} className='text-red-300 hover:translate duration-500 hover:scale-125 hover:text-red-600'/></td>
                  </tr>
                ))}
              </tbody>
            </table>
    </div>
  )
}

export default Property
