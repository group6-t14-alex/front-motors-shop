import { UserInterface } from "./user.interface";

export interface CreateAdInterface {
    brand: string;
    model: string;
    year: number;
    fuel: string;
    km: number;
    color: string;
    priceFipe: number;
    price: number;
    description: string;
    image: string;
}

export interface createAdReturnInterface {
  id: string;
  brand: string;
  model: string;
  year: number;
  fuel: string;
  km: number;
  color: string;
  priceFipe: number;
  price: number;
  description: string;
  userId: UserInterface;
  imageUrl: string;
  isActive: boolean;
  // listComment: Array<>;
}