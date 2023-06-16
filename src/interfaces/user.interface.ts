import { createAdReturnInterface } from "./createAd.interface";

export interface UserInterface {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    date_of_birth: string;
    description: string;
    type_user: "comprador" | "anunciante";
    cep: string;
    number: string;
    complement?: string;
    car: Array<createAdReturnInterface>;
  }