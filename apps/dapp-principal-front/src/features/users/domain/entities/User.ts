export interface IUserBase {
  readonly id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}
