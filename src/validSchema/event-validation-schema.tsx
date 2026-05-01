import * as Yup from "yup";

export const validateEventData = Yup.object({
  title: Yup.string()
    .required("Event title must be required")
    .min(3, "Event title at least 10 char")
    .max(20, "Name must be less than 20 char"),
  location: Yup.string().required(" location is required"),
  description: Yup.string()
    .required("Decription must be required")
    .min(20, "Decription must be at least 20 characters")
    .max(200, "Decription must be less than 200 char"),
  categories: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one category")
    .required("Categories must be required"),
  bannerUrl: Yup.mixed().required("File is required"),
});
