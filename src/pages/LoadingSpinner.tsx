
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-16 text-center">
        <div className="inline-block w-4 h-4 bg-airbnb-red rounded-full animate-bounce animate-delay-200"></div>
        <div className="inline-block w-4 h-4 bg-airbnb-red rounded-full animate-bounce animate-delay-100"></div>
        <div className="inline-block w-4 h-4 bg-airbnb-red rounded-full animate-bounce"></div>
      </div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;