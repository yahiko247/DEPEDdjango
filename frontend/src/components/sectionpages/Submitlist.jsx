import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa"; // File icon from react-icons

const QuarterSubmission = ({ quarter = 1, submissions = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-cover bg-center bg-fixed" style={{backgroundImage: `url(/path-to-your-background.jpg)`}}>
      
      {/* Centered Card */}
      <div className="max-w-xl mx-auto mt-24 bg-white bg-opacity-90 rounded-lg p-8 shadow-lg backdrop-blur-sm text-center">
        
        {/* Title */}
        <h1 className="text-lg font-semibold mb-6">
          Quarter {quarter} Submissions
        </h1>

        {/* Icon */}
        <div className="text-gray-500 mb-4 flex justify-center">
          <FaFileAlt size={40} />
        </div>

        {/* Message */}
        {submissions.length === 0 ? (
          <p className="text-gray-600 text-sm">No submissions for Quarter {quarter} yet.</p>
        ) : (
          // Render list of submissions here if any
          <ul>
            {submissions.map((sub, index) => (
              <li key={index}>{sub.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuarterSubmission;
