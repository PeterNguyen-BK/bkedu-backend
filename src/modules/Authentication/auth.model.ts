export interface IRegisterUser {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  birthday: string;
  password: string;
  phone_number: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}
