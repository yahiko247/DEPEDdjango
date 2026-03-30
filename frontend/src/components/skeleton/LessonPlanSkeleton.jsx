import React from "react";

const LessonPlanSkeleton = () => {
  const items = [1, 2, 3, 4, 5];

  return (
    <div className="flex flex-col w-full gap-y-2 p-2">
      <div className="grid grid-cols-4 md:grid-cols-6 text-xs text-center justify-items-center">
        <div className="hidden md:block">Profile</div>
        <div>Name</div>
        <div className="hidden md:block">Date Submitted</div>
        <div>Submitted</div>
        <div>Review Status</div>
        <div>Lesson Plan</div>
      </div>

      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 text-xxs md:text-sm md:grid-cols-6 text-center items-center justify-items-center h-20 border border-gray-300 rounded-md"
        >
          <div className="skeleton rounded-full size-8 bg-cover hidden md:block" />
          <div className="skeleton text-transparent">Juan Dela Cruz</div>
          <div className="skeleton hidden md:block text-transparent">
            January 12, 2026
          </div>
          <div className="skeleton text-transparent font-semibold">On Time</div>
          <div className="skeleton text-transparent font-semibold">
            Approved
          </div>
          <div className="skeleton text-transparent">Open</div>
        </div>
      ))}
    </div>
  );
};

export default LessonPlanSkeleton;
