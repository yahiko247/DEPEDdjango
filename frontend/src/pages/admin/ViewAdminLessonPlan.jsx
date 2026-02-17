import React from "react";
import Cards from "../../components/cards/Cards";
import StatusCards from "../../components/cards/StatusCards";
import {
  TfiWrite,
  MdPerson,
  MdOutlinePendingActions,
  FaCheck,
} from "../../icons/index.js";
import TabContent from "../../components/tabs/TabContent.jsx";
import { useState, useMemo } from "react";
import { Profile } from "../../assets";

const ViewLessonPlan = () => {
  const cardData = [
    {
      index: 1,
      title: "Total Teachers",
      amount: 0,
      icon: <MdPerson className="size-6" />,
      colorClass: "border-blue-500/30 bg-blue-500/30",
    },
    {
      index: 2,
      title: "Total Submission",
      amount: 0,
      icon: <TfiWrite className="size-6" />,
      colorClass: "border-green-500/30 bg-green-500/30",
    },
    {
      index: 3,
      title: "Pending Review",
      amount: 0,
      icon: <MdOutlinePendingActions className="size-6" />,
      colorClass: "border-orange-500/30 bg-orange-500/30",
    },
    {
      index: 4,
      title: "Approved",
      amount: 0,
      icon: <FaCheck className="size-6" />,
      colorClass: "border-green-500/30 bg-green-500/30",
    },
  ];

  const tabsMock = [
    {
      index: 1,
      id: 1,
      tcaher: "quarter_tab_1",
      label: "Quarter 1",
    },
    {
      index: 2,
      id: 2,
      name: "quarter_tab_1",
      label: "Quarter 2",
    },
    {
      index: 3,
      id: 3,
      name: "quarter_tab_1",
      label: "Quarter 3",
    },
    {
      index: 4,
      id: 4,
      name: "quarter_tab_1",
      label: "Quarter 4",
    },
  ];

  const pdf = "/mock.pdf";

  const mockData = [
    {
      index: 1,
      profile: Profile,
      teacherName: "Juan Dela Cruz1",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "Late",
      quarter: 1,
      lessonPlan: pdf,
    },
    {
      index: 2,
      profile: Profile,
      teacherName: "Juan Dela Cruz1",
      reviewStatus: "Approved",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 1,
      lessonPlan: pdf,
    },
    {
      index: 3,
      profile: Profile,
      teacherName: "Juan Dela Cruz1",
      reviewStatus: "Rejected",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 1,
      lessonPlan: pdf,
    },
    {
      index: 4,
      profile: Profile,
      teacherName: "Juan Dela Cruz2",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 2,
      lessonPlan: pdf,
    },
    {
      index: 5,
      profile: Profile,
      teacherName: "Juan Dela Cruz2",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 2,
      lessonPlan: pdf,
    },
    {
      index: 6,
      profile: Profile,
      teacherName: "Juan Dela Cruz2",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 2,
      lessonPlan: pdf,
    },
    {
      index: 7,
      profile: Profile,
      teacherName: "Juan Dela Cruz3",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 3,
      lessonPlan: pdf,
    },
    {
      index: 8,
      profile: Profile,
      teacherName: "Juan Dela Cruz3",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 3,
      lessonPlan: pdf,
    },
    {
      index: 9,
      profile: Profile,
      teacherName: "Juan Dela Cruz3",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 3,
      lessonPlan: pdf,
    },
    {
      index: 10,
      profile: Profile,
      teacherName: "Juan Dela Cruz4",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 4,
      lessonPlan: pdf,
    },
    {
      index: 11,
      profile: Profile,
      teacherName: "Juan Dela Cruz4",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 4,
      lessonPlan: pdf,
    },
    {
      index: 12,
      profile: Profile,
      teacherName: "Juan Dela Cruz4",
      reviewStatus: "Pending",
      dateSubmitted: "January 31, 2026",
      submissionStatus: "On Time",
      quarter: 4,
      lessonPlan: pdf,
    },
  ];

  const [activeTab, setActiveTab] = useState(1);

  const filteredData = useMemo(() => {
    return mockData.filter((item) => item.quarter === activeTab);
  }, [activeTab]);

  return (
    <div className="border border-black w-full h-screen flex flex-col items-center gap-6 p-4 lg:w-3/4">
      {/*Status Cards*/}
      <div className="grid grid-cols-2 lg:flex lg:flex-row w-full gap-6">
        {cardData.map((card) => (
          <StatusCards
            title={card.title}
            icon={card.icon}
            data={card.amount}
            colorClass={card.colorClass}
          />
        ))}
      </div>
      {/*Quarter View Lesson Plan Section*/}
      <div className="flex flex-col flex-1 border border-white bg-white rounded-md w-full overflow-y-auto px-4 py-4">
        {/*All Lesson Plan Submissions Text*/}
        <div className="h-15 flex flex-row justify-between items-center">
          <div className="text-xxs sm:text-sm md:text-base">
            <h1 className="font-bold">All Lesson Plan Submissions</h1>
            <div>Review and manage teacher submissions organized by week</div>
          </div>
          <div className="text-xs sm:text-sm md:text-base">All Teachers</div>
        </div>
        <div className="flex flex-row tabs tabs-box tabs-xs  bg-gray-300 rounded-full justify-between p-1 gap-2 mb-4 w-full">
          {tabsMock.map((tab) => (
            <button
              key={tab.id}
              className={`flex flex-1 font-bold text-xxs sm:text-xs md:text-sm rounded-full tab transition-all ${
                activeTab === tab.id ? "tab-active bg-white" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-md border flex flex-1">
          <TabContent data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default ViewLessonPlan;
