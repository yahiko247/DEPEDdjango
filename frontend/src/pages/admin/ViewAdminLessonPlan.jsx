import React from "react";
import { Background, LessonPlan } from "../../assets";
import Cards from "../../components/cards/Cards";

const ViewLessonPlan = () => {
  const cardData = [
    {
      index: 1,
      title: "Total Teachers",
      amount: 0,
      image: LessonPlan,
    },
    {
      index: 2,
      title: "Total Submission",
      amount: 0,
      image: LessonPlan,
    },
    {
      index: 3,
      title: "Pending Review",
      amount: 0,
      image: LessonPlan,
    },
    {
      index: 4,
      title: "Approved",
      amount: 0,
      image: LessonPlan,
    },
  ];

  return (
    <div className="border border-black flex flex-col gap-y-5">
      <div className="grid grid-cols-4 gap-6">
        {cardData.map((card) => (
          <div className="border border-white rounded-md min-w-60">
            <div className="flex flex-row">
              image
              <div className="flex flex-col">
                <div>total teacher</div>
                <div>asdas</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex flex-row gap-6">
        {cardData.map((card) => (
          <div className="border border-white rounded-md min-w-60">
            <div className="flex flex-row">
              image
              <div className="flex flex-col">
                <div>total teacher</div>
                <div>asdas</div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="flex flex-col min-w-60 min-h-60 border border-red-500 bg-gray-100 p-5">
        <div>All Lesson Plan Submissions</div>
        <div>Review and manage teacher submissions organized by week</div>
        <div className="flex justify-between tabs tabs-lift">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Tab 1"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Tab content 1
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Tab 2"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Tab content 2
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Tab 3"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Tab content 3
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Tab 4"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            Tab content 4
          </div>
        </div>
      </div>
    </div>
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
