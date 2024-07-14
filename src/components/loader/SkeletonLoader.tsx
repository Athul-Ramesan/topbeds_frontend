import  { useState, useEffect } from 'react';

const SkeletonLoader = ({ cardWidth }:any) => {
  console.log("🚀 ~ SkeletonLoader ~ cardWidth:", cardWidth)
  const [loading, setLoading] = useState(true);
  const cardCount = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const skeletonCards = Array.from({ length: cardCount }, (_, index) => (
    <div key={index} className={`w-[${cardWidth}] bg-gray-300 h-64 rounded-lg m-4`}></div>
  ));

  return (
    <div>
      {loading ? (
        <div className="flex flex-wrap justify-center">
          {skeletonCards}
        </div>
      ) : (
        <div>Content loaded</div>
      )}
    </div>
  );
};

export default SkeletonLoader;
