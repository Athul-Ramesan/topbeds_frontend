import { useLocation } from "react-router-dom"
import ImageCard from "../../components/public/ImageCard"
import { useState } from "react"

const SearchResult = () => {
    const location = useLocation()
    const searchResult = location.state
    console.log("🚀 ~ SearchResult ~ searchResult:", searchResult)
  return (
    <div className="mt-10 h-screen">
      <ImageCard properties={searchResult}/>
    </div>
  )
}

export default SearchResult
