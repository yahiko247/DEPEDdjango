import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

//putting accesstoken as localstorage is temporary we need to put it to cookies
const accessToken = localStorage.getItem("accessToken");

export const getLessonPlan = async (params) => {
  try {
    const response = await api.get("/lessonplan", {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const reviewLessonPlan = async (lessonplanID, status, feedBack) => {
  try {
    const response = await api.patch(
      `/reviewlessonplan/${lessonplanID}/`,
      {
        status: status,
        feedback: feedBack,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("Response Data:", response.data);
    return response.data;
  } catch (e) {
    console.log("Error:", e);
    throw e;
  }
};
