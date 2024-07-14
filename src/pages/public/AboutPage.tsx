import AboutUs from "./AboutUs";
import Mission from "./Mission";
import Offerings from "./Offerings";
import Team from "./Team";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const AboutPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    }, []);

    if(loading){
      return <LoadingSpinner />
    }
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <AboutUs />
      <Mission />
      <Offerings />
      <Team />
    </div>
  );
}

export default AboutPage
