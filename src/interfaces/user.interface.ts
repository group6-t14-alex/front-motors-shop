import { createAdReturnInterface } from "./createAd.interface";

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    date_of_birth: string;
    description: string;
    type_user: string;
    cep: string;
    number: string;
    complement?: string;
    car: Array<createAdReturnInterface>;
}