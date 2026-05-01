import { EventType } from "@/@types/event.type";
import axios from "axios";

const API = import.meta.env.VITE_BASE_URL;
//fetch events
export const getEvents = async (categories: string[] = []) => {
  try {
    const params = new URLSearchParams();
    const jointCategories = categories.join(",");
    params.append("categories", jointCategories);

    const { data } = await axios.get(`${API}event?${params.toString()}`);
    return data.data;
  } catch (error: any) {
    console.log("error occur in get events ");
    throw (
      error?.response?.data?.message || {
        message: "An unknown error occurred.",
      }
    );
  }
};

// fetch event

export const getEventById = async (_id: string) => {
  try {
    const res = await axios.get(API + "event" + `/${_id}`);
    return res.data;
  } catch (error: any) {
    console.log("error occur in get event ");
    throw (
      error?.response?.data?.message || {
        message: "An unknown error occurred.",
      }
    );
  }
};
//for delete event
export const deleteEventById = async (_id: string) => {
  try {
    const res = await axios.delete(API + "event" + `/${_id}`);
    if (!res) {
      throw new Error("Failed to delete event");
    }
    return res.data;
  } catch (error: any) {
    console.log("error occur in delete event ");
    throw (
      error?.response?.data?.message || {
        message: "An unknown error occurred.",
      }
    );
  }
};

//for createing event
export const createEvent = async (event: Partial<EventType>) => {
  try {
    await axios.post(API + "event", event);
  } catch (error: any) {
    console.log("error occur in create event ");
    throw (
      error?.response?.data?.message || {
        message: "An unknown error occurred.",
      }
    );
  }
};
// for update event
export const updateEvent = async (_id: string, event: Partial<EventType>) => {
  try {
    const res = await axios.patch(API + "event" + `/${_id}`, event);
    if (!res) {
      throw new Error("Failed to update event");
    }
    return res.data;
  } catch (error: any) {
    console.log("error occur in update event ");
    throw (
      error?.response?.data?.message || {
        message: "An unknown error occurred.",
      }
    );
  }
};
