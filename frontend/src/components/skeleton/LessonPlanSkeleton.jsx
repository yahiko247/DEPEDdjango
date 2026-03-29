import React from "react";

const LessonPlanSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 h-20 border border-gray-400">
        <div className="skeleton rounded-full" />
        <div className="skeleton w-2 h-2" />
      </div>
    </div>
  );
};

export default LessonPlanSkeleton;
