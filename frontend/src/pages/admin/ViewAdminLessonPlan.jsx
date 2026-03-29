import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ActiveSchoolYearDialog from "../../components/dialog/ActiveSchoolYearDialog.jsx";
import StatusCards from "../../components/cards/StatusCards";
import { styled } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { Background, DEPED } from "../../assets/index.js";
import {
  TfiWrite,
  MdPerson,
  MdOutlinePendingActions,
  FaCheck,
} from "../../icons/index.js";
import TabContent from "../../components/tabs/TabContent.jsx";
import { useState, useMemo } from "react";
import { Profile } from "../../assets";
import { getLessonPlan } from "../../api/lessonPlanApi.js";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

import "react-toastify/dist/ReactToastify.css";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: "#2c8aad98",
}));

const ViewLessonPlan = () => {
  const { user, loading } = useAuth();
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
  //not mock data pls don't delete
  const tabsMock = [
    {
      index: 1,
      id: 1,
      label: "Quarter 1",
    },
    {
      index: 2,
      id: 2,
      label: "Quarter 2",
    },
    {
      index: 3,
      id: 3,
      label: "Quarter 3",
    },
    {
      index: 4,
      id: 4,
      label: "Quarter 4",
    },
  ];

  // Menu for account icon
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeSchoolYearDialog, setActiveSchoolYearDialog] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [activeTab, setActiveTab] = useState(1);
  const [lessonPlans, setLessonPlans] = useState([]);

  const fetchLessonPlans = async () => {
    try {
      setDataLoading(true);
      console.log("loading true");
      const data = await getLessonPlan();
      setLessonPlans(data);
    } catch (e) {
      console.log("Error boss:", e);
    } finally {
      setDataLoading(false);
      console.log("loading false");
    }
  };

  useEffect(() => {
    if (loading) return;
    fetchLessonPlans();
  }, [loading]);

  const filteredData = useMemo(() => {
    return lessonPlans.filter((item) => item.quarter === activeTab);
  }, [lessonPlans, activeTab]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <CssBaseline />
      <span className="bg-blue-400">
        <Toolbar>
          <Box
            component="img"
            src={DEPED}
            sx={{ height: 40, width: "auto", mr: 2 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>

          <div
            className="btn btn-outline text-xs w-30"
            onClick={() => setActiveSchoolYearDialog(true)}
          >
            Set Active School Year
          </div>

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-controls={menuOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
          >
            <AccountCircle />
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem>Log out</MenuItem>
          </Menu>
        </Toolbar>
      </span>

      {/*Background*/}
      <div
        className="relative flex flex-1 items-center justify-center bg-cover bg-center bg-fixed flex-col sm:flex-row gap-6 p-2"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="w-full min-h-full flex flex-col items-center gap-6 p-4 lg:w-3/4">
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
          <div className="flex flex-col flex-1 border border-white bg-white rounded-md w-full min-h-0 px-4 py-4">
            {/*All Lesson Plan Submissions Text*/}
            <div className="h-15 flex flex-row justify-between items-center">
              <div className="text-xxs sm:text-sm md:text-base">
                <h1 className="font-bold">All Lesson Plan Submissions</h1>
                <div>
                  Review and manage teacher submissions organized by week
                </div>
              </div>
              <div className="text-xs sm:text-sm md:text-base">
                All Teachers
              </div>
            </div>
            <div className="flex flex-row tabs tabs-box tabs-xs  bg-gray-300 rounded-full justify-between p-1 gap-2 mb-4 w-full">
              {tabsMock.map((tab) => (
                <button
                  key={tab.id}
                  className={`flex flex-1 font-bold text-xxs sm:text-xs md:text-sm rounded-full tab transition-all ${
                    activeTab === tab.id ? "tab-active bg-white" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-md flex flex-1 min-h-0 overflow-y-auto">
              <TabContent
                data={filteredData}
                refreshLessonPlan={fetchLessonPlans}
                loading={dataLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      {activeSchoolYearDialog && (
        <ActiveSchoolYearDialog
          onClose={() => setActiveSchoolYearDialog(false)}
        />
      )}
    </div>
  );
};

export default ViewLessonPlan;

// const mockData = [
//   {
//     index: 1,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz1",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "Late",
//     quarter: 1,
//     lessonPlan: pdf,
//   },
//   {
//     index: 2,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz1",
//     reviewStatus: "Approved",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 1,
//     lessonPlan: pdf,
//   },
//   {
//     index: 3,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz1",
//     reviewStatus: "Rejected",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 1,
//     lessonPlan: pdf,
//   },
//   {
//     index: 4,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz2",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 2,
//     lessonPlan: pdf,
//   },
//   {
//     index: 5,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz2",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 2,
//     lessonPlan: pdf,
//   },
//   {
//     index: 6,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz2",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 2,
//     lessonPlan: pdf,
//   },
//   {
//     index: 7,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz3",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 3,
//     lessonPlan: pdf,
//   },
//   {
//     index: 8,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz3",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 3,
//     lessonPlan: pdf,
//   },
//   {
//     index: 9,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz3",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 3,
//     lessonPlan: pdf,
//   },
//   {
//     index: 10,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz4",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 4,
//     lessonPlan: pdf,
//   },
//   {
//     index: 11,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz4",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 4,
//     lessonPlan: pdf,
//   },
//   {
//     index: 12,
//     profile: Profile,
//     teacherName: "Juan Dela Cruz4",
//     reviewStatus: "Pending",
//     dateSubmitted: "January 31, 2026",
//     submissionStatus: "On Time",
//     quarter: 4,
//     lessonPlan: pdf,
//   },
// ];
