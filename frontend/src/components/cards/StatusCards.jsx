import React from "react";

const StatusCards = ({ icon, title, data, colorClass }) => {
  return (
    <div className="p-2 border border-white w-full rounded-md min-h-20 bg-white  flex flex-row gap-x-2 items-center lg:flex-1 xs:p-4">
      <div className={`border ${colorClass} rounded-md p-1`}>{icon}</div>
      <div className="flex flex-col px-2 text-sm">
        <div className="font-bold text-xxs">{title}</div>
        <div>{data}</div>
      </div>
    </div>
  );
};

export default StatusCards;
