import React, { useEffect, useState } from "react";
import { Background, LessonPlan } from "../../assets";
import Cards from "../cards/Cards";
import Submit from "../modal/SubmitModal";
import { useSchoolYear } from "../../context/SchoolYearProvider";

const SubView = () => {
  const { schoolYear, deadlines } = useSchoolYear();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  const cardData = {
    1: {
      title: "Quarter 1",
      subtitle: "Submit Teacher Lesson Plan for the 1st Quarter",
      image: LessonPlan,
    },
    2: {
      title: "Quarter 2",
      subtitle: "Submit Teacher Lesson Plan for the 2nd Quarter",
      image: LessonPlan,
    },
    3: {
      title: "Quarter 3",
      subtitle: "Submit Teacher Lesson Plan for the 3rd Quarter",
      image: LessonPlan,
    },
    4: {
      title: "Quarter 4",
      subtitle: "Submit Teacher Lesson Plan for the 4th Quarter",
      image: LessonPlan,
    },
  };

  const handleOpenModal = (quarter) => {
    setSelectedQuarter(quarter);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedQuarter(null); // ✅ reset selected quarter
    setIsOpen(false); // ✅ close modal
  };

  return (
    <div
      className="min-w-screen min-h-screen relative flex items-center justify-center bg-cover bg-center bg-fixed pt-14 sm:pt-16 flex-col sm:flex-row gap-6 p-2"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="grid grid-cols-2 gap-4">
        {deadlines.map((q) => {
          const assets = cardData[q.quarter_number];
          return (
            <Cards
              key={q.quarter_id}
              title={assets.title}
              subtitle={assets.subtitle}
              image={assets.image}
              onClick={() => handleOpenModal(q.quarter_id)}
            />
          );
        })}
      </div>

      {/* Modal */}
      {isOpen && (
        <Submit
          isOpen={isOpen}
          onClose={handleCloseModal}
          quarter={selectedQuarter}
        />
      )}
    </div>
  );
};

export default SubView;
