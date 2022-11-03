import { RegisterOptions } from "react-hook-form";
export interface Picture {
  urls: string;
  color: string;
}
export interface Item {
  createdAt: string;
  nameEng: string;
  nameKr: string;
  productId: number;
  cartegory: string;
  brand: string;
  price: number;
  quickdlivery: boolean;
  imgUrl: string;
}
export type Option<T> = [keyof T, RegisterOptions];

export type OptionCreator = <T>(option: Option<T>) => SubOptionCreator<T>;

export type SubOptionCreator<T> = (customOpts?: RegisterOptions) => Option<T>;

export interface LoginForm {
  email: string;
  password: string;
}
export type Size =
  | 220
  | 225
  | 230
  | 235
  | 240
  | 245
  | 250
  | 255
  | 260
  | 265
  | 270
  | 275
  | 280
  | 285
  | 290
  | 295
  | 300;
export interface JoinForm extends LoginForm {
  size?: Size;
  age: [boolean, boolean];
  notification: [boolean, boolean, boolean];
  ["age.0"]: boolean;
  ["age.1"]: boolean;
  ["age.2"]: boolean;
  ["notification.0"]: boolean;
  ["notification.1"]: boolean;
}
