import React from "react";

const DialogSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="skeleton w-1/2 h-4"></div>
      <div className="skeleton w-1/3 h-4"></div>
      <div className="skeleton w-3/4 h-4"></div>
      <div className="skeleton w-full h-4"></div>
      <div className="skeleton w-full h-4"></div>
      <div className="skeleton w-1/2 h-4"></div>
      <div className="skeleton w-1/3 h-4"></div>
    </div>
  );
};

export default DialogSkeleton;
