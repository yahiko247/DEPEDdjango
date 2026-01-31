import React from "react";
import { Background, LessonPlan } from "../../assets";
import Cards from "../../components/cards/Cards";

const ViewLessonPlan = () => {
  const cardData = [
    {
      index: 1,
      title: "Quarter 1",
      subtitle: "View Teacher Lesson Plan for the 1st Quarter",
      image: LessonPlan,
    },
    {
      index: 2,
      title: "Quarter 2",
      subtitle: "View Teacher Lesson Plan for the 2nd Quarter",
      image: LessonPlan,
    },
    {
      index: 3,
      title: "Quarter 3",
      subtitle: "View Teacher Lesson Plan for the 3rd Quarter",
      image: LessonPlan,
    },
    {
      index: 4,
      title: "Quarter 4",
      subtitle: "View Teacher Lesson Plan for the 4th Quarter",
      image: LessonPlan,
    },
  ];

  return (
    <div
      className="min-w-screen min-h-screen relative flex items-center justify-center bg-cover bg-center bg-fixed pt-14 sm:pt-16 flex-col sm:flex-row gap-6 p-2"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="grid grid-cols-2 gap-4">
        {cardData.map((card) => (
          <Cards
            title={card.title}
            subtitle={card.subtitle}
            onClick={() => navigate(`/quarter/${card.index}`)}
            image={card.image}
          ></Cards>
        ))}
      </div>
    </div>
  );
};

export default ViewLessonPlan;
