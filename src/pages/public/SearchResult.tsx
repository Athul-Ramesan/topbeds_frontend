import { useLocation } from "react-router-dom"
import ImageCard from "../../components/public/ImageCard"

const SearchResult = () => {
    const location = useLocation()
    const searchResult = location.state
    console.log("🚀 ~ SearchResult ~ searchResult:", searchResult)
  return (
    <div className="mt-10 h-screen">
      {searchResult ? (
        <ImageCard properties={searchResult}/>
      ):(
        <div className="flex justify-center items-center h-screen">No Result</div>
      )}
    </div>
  )
}

export default SearchResult
