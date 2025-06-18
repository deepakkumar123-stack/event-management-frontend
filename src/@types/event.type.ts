import { UserType } from "./user.type";

export interface EventType {
  _id: string;
  title: string;
  description: string;
  location: string;
  bannerUrl: string;
  categories: string[];
  createdBy: UserType;
  createdAt?: string;
  updatedAt?: string;
}

// export interface EventType {
//   _id?: string;
//   title: string;
//   description: string;
//   location: string;
//   bannerUrl: string;
//   categories: CategoryType[];
//   createdBy: UserType;
//   createdAt?: string;
//   updatedAt?: string;
// }
