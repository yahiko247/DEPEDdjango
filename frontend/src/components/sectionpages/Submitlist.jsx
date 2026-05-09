import React, { useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa"; // File icon from react-icons

const QuarterSubmission = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const quarter = searchParams.get("q") || "1";
  const submissions = location.state?.submissions || [];

  useEffect(() => {
    console.log(quarter);
    console.log(submissions);
  }, [submissions, quarter]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(/path-to-your-background.jpg)` }}
    >
      {/* Centered Card */}
      <div className="max-w-xl mx-auto mt-24 bg-white bg-opacity-90 rounded-lg p-8 shadow-lg backdrop-blur-sm text-center">
        {/* Title */}
        <h1 className="text-lg font-semibold mb-6 text-black">
          Quarter {quarter} Submissions
        </h1>

        {/* Icon */}
        <div className="text-gray-500 mb-4 flex justify-center">
          <FaFileAlt size={40} />
        </div>

        {/* Message */}
        {submissions?.length === 0 ? (
          <p className="text-gray-600 text-sm">
            No submissions for Quarter {quarter} yet.
          </p>
        ) : (
          // Render list of submissions here if any
          <div className="text-black gap-2">
            {submissions.map((sub) => {
              const isLate = sub.is_late;
              const lateLabel = isLate ? "Late" : "On Time";

              return (
                <li key={sub.plan_id}>
                  <span>
                    {lateLabel}
                    {sub.status}
                    {sub.created_at}
                  </span>
                </li>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuarterSubmission;
