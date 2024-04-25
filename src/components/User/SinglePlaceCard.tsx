import { useAppSelector } from "../../redux/store";

const SinglePlaceCard = () => {
  const {user} = useAppSelector(state=>state.user)
  console.log(user,'user user');
  
  return (
    <div>
      <div className="bg-gray-500 rounded-2xl flex">
        <img className="rounded-2xl object-cover" src="/airbnb-demo-page.jpg" alt="place image"/>
      </div>
    </div>
  )
}

export default SinglePlaceCard
