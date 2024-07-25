export const ChatListSkeleton = () => {
    const skeletons = Array(5).fill(0); // Generate an array with 5 items for skeleton placeholders
  
    return (
      <div className="h-full w-full overflow-y-auto">
        {skeletons.map((_, index) => (
          <div key={index} className="h-16 border-x-0 flex border items-center animate-pulse">
            <div className="size-12 rounded-full bg-gray-300">
              <div className="size-full bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-full flex flex-col py-1 px-2">
              <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="w-full h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
