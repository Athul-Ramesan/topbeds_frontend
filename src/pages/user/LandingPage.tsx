import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { useEffect } from "react";



const LandingPage = () => {
  const navigate = useNavigate()
  const { user, error } = useAppSelector(state => state.user)
  console.log(error, 'error>>>>>>>>>>', user, 'User>>>>>>>>>>>>>>>>>>>>>...');
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])
  return (
    <>
      {/* <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> */}
       

        {/* <SinglePlaceCard /> */}

      {/* </div> */}

    </>
  )
}

export default LandingPage
