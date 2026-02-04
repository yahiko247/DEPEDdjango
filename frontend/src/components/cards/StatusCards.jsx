import React from "react";

const StatusCards = ({ icon, title, data }) => {
  return (
    <div className="border border-white min-w-40 xs:min-w-50 rounded-md min-h-20 bg-white p-2">
      <div className="flex flex-row items-center">{icon}</div>
    </div>
  );
};

export default StatusCards;
