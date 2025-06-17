import axios from "axios";

const API = import.meta.env.VITE_BASE_URL;

export const getCategories = async () => {
  try {
    const res = await axios.get(API + "category");
    return res.data;
  } catch (error: any) {
    console.log("error occur in get categories ");
    throw (
      error?.response?.data?.message || {
        message: "An unknown error occurred.",
      }
    );
  }
};
