import React from "react";
import { Background, LessonPlan } from "../../assets";
import Cards from "../../components/cards/Cards";
import StatusCards from "../../components/cards/StatusCards";
import {
  TfiWrite,
  MdPerson,
  MdOutlinePendingActions,
  FaCheck,
} from "../../icons/index.js";
import TabContent from "../../components/tabs/TabContent.jsx";
import { useState } from "react";

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

  const tabs = [
    {
      index: 1,
      id: "Quarter 1",
      name: "quarter_tab_1",
      label: "Quarter 1",
    },
    {
      index: 2,
      id: "Quarter 2",
      name: "quarter_tab_1",
      label: "Quarter 2",
    },
    {
      index: 3,
      id: "Quarter 3",
      name: "quarter_tab_1",
      label: "Quarter 3",
    },
    {
      index: 4,
      id: "Quarter 4",
      name: "quarter_tab_1",
      label: "Quarter 4",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="border border-black w-full min-h-screen flex flex-col items-center gap-6 p-4 lg:w-3/4">
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
          <div className="text-[10px] sm:text-sm md:text-base">
            <h1 className="font-bold">All Lesson Plan Submissions</h1>
            <div>Review and manage teacher submissions organized by week</div>
          </div>
          <div className="text-xs sm:text-sm md:text-base">All Teachers</div>
        </div>
        <div className="flex flex-row tabs tabs-box tabs-xs bg-gray-300 rounded-full justify-between p-1 gap-2 mb-4 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex flex-1 font-bold rounded-full tab transition-all ${
                activeTab === tab.id ? "tab-active bg-white" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-md p-4 border flex flex-1">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <TabContent key={tab.id} content={tab.label} />
              ),
          )}
        </div>
      </div>
    </div>

    // <div className="border border-black flex flex-col flex-1  gap-y-5">
    //   <div className="grid grid-cols-2  gap-6">
    //     {cardData.map((card) => (
    //       <div className="border border-white rounded-md min-w-60">
    //         <div className="flex flex-row">
    //           image
    //           <div className="flex flex-col">
    //             <div>total teacher</div>
    //             <div>asdas</div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   {/* <div className="flex flex-row gap-6">
    //     {cardData.map((card) => (
    //       <div className="border border-white rounded-md min-w-60">
    //         <div className="flex flex-row">
    //           image
    //           <div className="flex flex-col">
    //             <div>total teacher</div>
    //             <div>asdas</div>
    //           </div>
    //         </div>
    //       </div>
    //     ))}
    //   </div> */}
    //   <div className="flex flex-col min-w-60 min-h-60 border border-red-500 bg-gray-100 p-5">
    //     <div>All Lesson Plan Submissions</div>
    //     <div>Review and manage teacher submissions organized by week</div>
    //     <div className="flex justify-between tabs tabs-lift">
    //       <input
    //         type="radio"
    //         name="my_tabs_3"
    //         className="tab"
    //         aria-label="Tab 1"
    //       />
    //       <div className="tab-content bg-base-100 border-base-300 p-6">
    //         Tab content 1
    //       </div>

    //       <input
    //         type="radio"
    //         name="my_tabs_3"
    //         className="tab"
    //         aria-label="Tab 2"
    //         defaultChecked
    //       />
    //       <div className="tab-content bg-base-100 border-base-300 p-6">
    //         Tab content 2
    //       </div>

    //       <input
    //         type="radio"
    //         name="my_tabs_3"
    //         className="tab"
    //         aria-label="Tab 3"
    //       />
    //       <div className="tab-content bg-base-100 border-base-300 p-6">
    //         Tab content 3
    //       </div>

    //       <input
    //         type="radio"
    //         name="my_tabs_3"
    //         className="tab"
    //         aria-label="Tab 4"
    //       />
    //       <div className="tab-content bg-base-100 border-base-300 p-6">
    //         Tab content 4
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="grid grid-cols-2 gap-4">
    //   {cardData.map((card) => (
    //     <Cards
    //       title={card.title}
    //       subtitle={card.subtitle}
    //       onClick={() => navigate(`/quarter/${card.index}`)}
    //       image={card.image}
    //       key={card.index}
    //     ></Cards>
    //   ))}
    // </div>
  );
};

export default ViewLessonPlan;
