import { FC } from "react";

const SkeletonImageDiv: FC = () => {
  return (
    <div className="m-2 w-full h-36 rounded-3xl bg-gray-300 animate-pulse"></div>
  );
};

export default SkeletonImageDiv;
