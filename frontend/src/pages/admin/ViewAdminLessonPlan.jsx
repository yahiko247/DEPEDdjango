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
import Tabs from "../../components/tabs/Tabs.jsx";
import TabContent from "../../components/tabs/TabContent.jsx";

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
      name: "quarter_tab_1",
      label: "Quarter 1",
    },
    {
      name: "quarter_tab_1",
      label: "Quarter 2",
    },
    {
      name: "quarter_tab_1",
      label: "Quarter 3",
    },
    {
      name: "quarter_tab_1",
      label: "Quarter 4",
    },
  ];

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
      {/*Quarter Tabs*/}
      <div className="flex flex-col flex-1 border border-white bg-white rounded-md w-full overflow-y-auto px-4 py-2">
        {/*All Lesson Plan Submissions Text*/}
        <div className="h-20 flex flex-row justify-between items-center">
          <div>
            <h1>All Lesson Plan Submissions</h1>
            <div>Review and manage teacher submissions organized by week</div>
          </div>
          <div>All Teachers</div>
        </div>
        <div className="flex flex-row justify-between tabs tabs-box tabs-sm w-full bg-gray-300 rounded-full">
          {tabs.map((tab) => (
            <Tabs name={tab.name} label={tab.label} />
          ))}
        </div>
        {tabs.map((tab) => (
          <React.Fragment key={tab.index}>
            <TabContent content={tab.label} />
          </React.Fragment>
        ))}
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
