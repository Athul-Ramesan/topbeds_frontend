import { Plus } from "lucide-react"
import ImageDiv from "../../components/ImageDiv"
import { useContext, useEffect, useState } from "react"
import { HostPropertySingleContext } from "../../context/HostPropertySingleContext"
import SkeletonImageDiv from "../../components/SkeletonImageDiv"

const ShowPhotosHostProperty = () => {
  const { hostProperty } = useContext(HostPropertySingleContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className=" h-[525px] overflow-y-scroll">

      <div className="flex gap-4 justify-between items-center">
        <p className="text-3xl font-semibold text-font-accent m-1">Showcase your photos</p>
        <div className="inline-block bg-gray-200 rounded-full p-2 m-1 ">
          <Plus />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 m-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonImageDiv key={index} />
          ))
        )
          :
          (
            hostProperty.images.map((image, index) => (
              <ImageDiv key={index} image={image} width={`[10]`} />
            ))
          )}
      </div>

    </div>
  )
}

export default ShowPhotosHostProperty
