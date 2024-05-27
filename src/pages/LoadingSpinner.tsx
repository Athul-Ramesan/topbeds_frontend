import { PulseLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <PulseLoader color="#36d7b7" />
    </div>
</>
  );
};

export default LoadingSpinner;