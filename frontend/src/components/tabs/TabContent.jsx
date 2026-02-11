import React, { useEffect } from "react";
import { Profile } from "../../assets";

const TabContent = ({ data }) => {
  useEffect(() => {
    console.log("Data:", data);
  });

  if (data.length === 0) {
    return <div className="p-6 text-gray-500">No submissions found.</div>;
  }
  return (
    <div className="flex flex-col w-full gap-y-2 p-2">
      <div className="grid grid-cols-5 text-xs border border-amber-500 text-center">
        <div className="hidden md:block">Profile</div>
        <div>Name</div>
        <div>Review Status</div>
        <div>Date Submitted</div>
        <div>Submission Status</div>
      </div>

      {data.map((item) => (
        <div className="grid grid-cols-5 text-center items-center justify-items-center border border-red-400 rounded-md">
          <img
            src={item.profile}
            className="rounded-full size-10 bg-cover border border-blue-500 hidden md:block"
          />
          <div>{item.teacherName}</div>
          <div>{item.reviewStatus}</div>
          <div>{item.dateSubmitted}</div>
          <div>{item.submissionStatus}</div>
        </div>
      ))}
    </div>
  );
};

export default TabContent;
