import React, { useEffect, useState } from "react";
import {
  getQuarterDeadlines,
  getSchoolYears,
  updateQuarterDeadline,
} from "../../api/principalApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DialogSkeleton from "../skeleton/DialogSkeleton";

const TextComponent = ({ text }) => {
  return <div className="text-xs md:text-base">{text}</div>;
};

const ActiveSchoolYearDialog = ({ onClose }) => {
  const [deadlines, setDeadlines] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [loading, setLoading] = useState(false);

  const fetchQuarterDeadlines = async (year_id) => {
    const data = await getQuarterDeadlines(year_id);
    console.log("quarters", data);
    setDeadlines(data);
  };

  const fetchSchoolYear = async () => {
    try {
      setLoading(true);
      const data = await getSchoolYears();
      console.log(data);
      const activeYear = data.find((year) => year.is_active);
      console.log("Active year:", activeYear.school_year);
      if (activeYear) {
        setSelectedYear(activeYear);
        console.log("active", activeYear.year_id);

        fetchQuarterDeadlines(activeYear.year_id);
      }
    } catch (e) {
      throw e;
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchSchoolYear();
  }, []);

  const handleDeadlineSave = async () => {
    try {
      updateQuarterDeadline(deadlines);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeadlineChange = (id, newDate) => {
    setDeadlines((prev) =>
      prev.map((q) => (q.quarter_id === id ? { ...q, deadline: newDate } : q)),
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2"
      onClick={onClose}
    >
      <div
        className="bg-white w-3/4 md:w-1/2 xl:w-1/4  max-w-5xl h-3/4 md:h-1/2 rounded-lg flex flex-col p-2 gap-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex border-b justify-between">
          <h2 className="font-semibold">Set Active School Year</h2>
          <div className="btn btn-soft " onClick={onClose}>
            ✕
          </div>
        </div>

        <div className="relative h-full">
          <div
            className={`absolute inset-0 transition-opacity duration-500  ${
              loading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <DialogSkeleton />
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-500 delay-100 flex flex-col justify-between  
              ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <div className="flex w-full flex-col gap-y-5 flex-1  ">
              <div className="flex flex-row items-center gap-x-2">
                <div className="font-bold">
                  Active School Year: {selectedYear?.school_year}
                </div>

                <button className="text-xs btn btn-outline">
                  Create School Year
                </button>
              </div>

              {deadlines.map((deadline) => (
                <div
                  key={deadline.quarter_id}
                  className="flex flex-row items-center gap-x-2 w-full"
                >
                  <div>Quarter {deadline.quarter_number}:</div>
                  <input
                    type="date"
                    value={deadline.deadline}
                    onChange={(e) =>
                      handleDeadlineChange(deadline.quarter_id, e.target.value)
                    }
                    className="input input-bordered w-1/2"
                  />
                </div>
              ))}
            </div>

            {/* add a success for updating before reset */}
            <div className="flex flex-row justify-evenly w-full">
              <button
                className="w-30  xs:w-40 btn btn-success rounded-full text-white"
                onClick={() => {
                  handleDeadlineSave();
                }}
              >
                UPDATE
              </button>
              <button
                className="w-30  xs:w-40 btn btn-error rounded-full text-white"
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="select select-bordered"
            >
              <option value=""> Select School Year</option>
              {schoolYears.map((year) => (
                <option key={year.year_id} value={year.year_id}>
                  {year.school_year}
                </option>
              ))}
            </select> */
}

export default ActiveSchoolYearDialog;
