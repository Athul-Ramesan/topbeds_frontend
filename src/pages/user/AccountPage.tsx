import { Link } from "react-router-dom";

export default function AccountPage (){
      
    return(
        <>
        <nav>
        <Link className="p-2" to={"/account"}> My Bookings</Link>
        <Link className="p-2" to={"/account/booking"}> My Bookings</Link>
        <Link className="p-2" to={"/account/places"}> My Bookings</Link>
        </nav>
        </>
    )
}