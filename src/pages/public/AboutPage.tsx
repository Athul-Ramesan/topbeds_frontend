import { Skeleton } from "@mui/material"
import SkeletonLoader from "../../components/loader/SkeletonLoader"

const AboutPage = () => {
  return (
    <div>
      About page
      <SkeletonLoader cardWidth={"80px"} />
    </div>
  )
}

export default AboutPage
