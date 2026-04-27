import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useMemo,
} from "react";
import { getQuarterDeadlines, getSchoolYears } from "../api/principalApi";

const SchoolYearContext = createContext();

export const SchoolYearProvider = ({ children }) => {
  const [schoolYear, setSchoolYear] = useState(null);
  const [yearStart, setYearStart] = useState(null);
  const [yearEnd, setYearEnd] = useState(null);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuarterDeadlines = async (year_id) => {
    const data = await getQuarterDeadlines(year_id);
    setDeadlines(data);
  };

  const fetchSchoolYear = async () => {
    try {
      setLoading(true);
      const data = await getSchoolYears();
      const activeYear = data.is_active;
      if (activeYear) {
        setSchoolYear(data.school_year);
        setYearStart(data.year_start);
        setYearEnd(data.year_end);
        fetchQuarterDeadlines(data.year_id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolYear();
    console.log("School Year Provider ran WTF");
  }, []);

  //   const value = useMemo(() => {
  //     yearStart,
  //     yearEnd,
  //     schoolYear,
  //     deadlines,
  //     loading,
  //     refreshSchoolYear: fetchSchoolYear,
  //   }, [yearStart, yearEnd, schoolYear, deadlines, loading])

  return (
    <SchoolYearContext.Provider
      value={{ yearStart, yearEnd, schoolYear, deadlines, loading, fet }}
    >
      {children}
    </SchoolYearContext.Provider>
  );
};

export const useSchoolYear = () => useContext(SchoolYearContext);
