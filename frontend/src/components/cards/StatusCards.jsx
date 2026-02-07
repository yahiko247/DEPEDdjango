import React from "react";

const StatusCards = ({ icon, title, data, colorClass }) => {
  return (
    <div className="border border-white w-full lg:flex-1  rounded-md min-h-20 bg-white p-4 flex flex-row gap-x-2 items-center">
      <div className={`border ${colorClass} rounded-md p-1`}>{icon}</div>
      <div className="flex flex-col px-2 text-sm">
        <div className="font-bold">{title}</div>
        <div>{data}</div>
      </div>
    </div>
  );
};

export default StatusCards;
