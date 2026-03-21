import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const getSchoolYears = async () => {
  try {
    const response = await api.get("schoolyear/");
    console.log(response.data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const createSchoolYear = async () => {
  try {
    const response = await api.post("schoolyear/");
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updateSchoolYear = async ({
  year_start,
  year_end,
  is_active,
  year_id,
}) => {
  try {
    const payload = {
      year_start,
      year_end,
      is_active,
    };

    Object.keys(payload).forEach(
      (key) => payload[key] === undefined && delete payload[key],
    );

    const response = await api.patch(`setschoolyear/${year_id}/`, payload);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getQuarterDeadlines = async (year_id) => {
  console.log("yearID", year_id);
  try {
    const response = await api.get(`quarter/${year_id}`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const updateQuarterDeadline = async (deadlines) => {
  try {
    const response = await api.patch(`quarter/update/`, deadlines);
    return response.data;
  } catch (e) {
    throw e;
  }
};
