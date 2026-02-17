import React, { useEffect, useState } from "react";
import { Profile } from "../../assets";
import PDFDialog from "../dialog/PDFDialog";

const TabContent = ({ data }) => {
  const [selectedPDF, setSelectedPDF] = useState();

  const reviewStatusStyles = {
    Pending: "text-yellow-500",
    Approved: "text-green-500",
    Rejected: "text-red-500",
  };

  useEffect(() => {
    console.log("Data:", data);
  });

  if (data.length === 0) {
    return <div className="p-6 text-gray-500">No submissions found.</div>;
  }
  return (
    <div className="flex flex-col w-full gap-y-2 p-2">
      <div className="grid grid-cols-4 md:grid-cols-6 text-xs border border-amber-500 text-center justify-items-center">
        <div className="hidden md:block">Profile</div>
        <div>Name</div>
        <div>Review Status</div>
        <div className="hidden md:block">Date Submitted</div>
        <div>Submitted</div>
        <div>Lesson Plan</div>
      </div>

      {data.map((item) => {
        const isLate = item.submissionStatus === "Late";
        const reviewClass =
          reviewStatusStyles[item.reviewStatus] || "text-gray-500";
        return (
          <div className="grid grid-cols-4 text-xxs md:text-sm md:grid-cols-6 text-center items-center justify-items-center h-20 border border-gray-300 rounded-md">
            <img
              src={item.profile}
              className="rounded-full size-8 bg-cover border border-blue-500 hidden md:block"
            />
            <div className="font-bold">{item.teacherName}</div>
            <div className={`font-semibold ${reviewClass}`}>
              {item.reviewStatus}
            </div>
            <div className="hidden md:block">{item.dateSubmitted}</div>
            <span className={`${isLate ? "text-red-500" : "text-green-500"}`}>
              {item.submissionStatus}
            </span>

            <button onClick={() => setSelectedPDF(item.lessonPlan)}>
              Open
            </button>
          </div>
        );
      })}

      {selectedPDF && (
        <PDFDialog file={selectedPDF} onClose={() => setSelectedPDF(null)} />
      )}
    </div>
  );
};

export default TabContent;
