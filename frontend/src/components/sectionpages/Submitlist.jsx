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
      {submissions.length === 0 ? (
        <div className="max-w-xl mx-auto mt-24 bg-white bg-opacity-90 rounded-lg p-8 shadow-lg backdrop-blur-sm text-center">
          {/* Title */}
          <h1 className="text-lg font-semibold mb-6 text-black">
            Quarter {quarter} Submissions
          </h1>

          {/* Icon */}
          <div className="text-gray-500 mb-4 flex justify-center">
            <FaFileAlt size={40} />
          </div>
          <p className="text-gray-600 text-sm">
            No submissions for Quarter {quarter} yet.
          </p>
        </div>
      ) : (
        <div className="min-h-full flex flex-col justify-start items-center ">
          <div className="w-full min-h-full flex flex-col items-center gap-6 p-4 lg:w-3/4 bg-white">
            {/* Title */}
            <h1 className="text-lg font-semibold mb-6 text-black">
              Quarter {quarter} Submissions
            </h1>
            <div className="w-full grid grid-cols-4 md:grid-cols-5 text-xs text-center text-black">
              <div>Name</div>
              <div className="hidden md:block">Date Submitted</div>
              <div>Submitted</div>
              <div>Review Status</div>
              <div>Certificate</div>
            </div>

            {submissions.map((sub) => {
              const hasQR = sub.qr_code !== "";
              const isLate = sub.is_late;
              const lateLabel = isLate ? "Late" : "On Time";
              const formattedDate = new Date(sub.created_at).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  // hour: "2-digit",
                  // minute: "2-digit",
                },
              );

              return (
                <div
                  key={sub.plan_id}
                  className="w-full grid grid-cols-4 md:grid-cols-5 text-xs md:text-sm justify-items-center text-black"
                >
                  <div>
                    {sub.teacher.first_name} {sub.teacher.middle_initial}{" "}
                    {sub.teacher.last_name}
                  </div>
                  <div className="hidden md:block">{formattedDate}</div>
                  <div>{lateLabel}</div>
                  <div>{sub.status}</div>
                  <div
                    className={`text-xs md:text-sm ${hasQR ? "btn btn-outline h-6 w-10 md:h-8 md:w-12" : ""}`}
                  >
                    {hasQR ? "Open" : "None"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Centered Card */}
    </div>
  );
};

export default QuarterSubmission;
