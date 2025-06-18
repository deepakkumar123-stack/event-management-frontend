import { UserType } from "@/@types/user.type";
import axios from "axios";
const API = import.meta.env.VITE_BASE_URL;

export const authUserRegister = async (user: Partial<UserType>) => {
  try {
    console.log("check user data ", user);
    const res = await axios.post(API + "auth-user/register", user);
    // console.log("response data", res.data);
    return res.data;
  } catch (error: any) {
    console.log(
      "error occur in register user ",
      error?.response?.data?.message
    );
    throw error?.response?.data?.message || { message: "Error in create User" };
  }
};

export const authUserLogin = async (user: Partial<UserType>) => {
  try {
    const res = await axios.post(API + "auth-user/login", user);

    return res.data;
  } catch (error: any) {
    console.log("error occur in login user ");
    throw error?.response?.data?.message || "Error in User login";
  }
};
