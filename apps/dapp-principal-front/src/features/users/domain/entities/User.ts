/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IUserBase {
  readonly id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface INewUser extends Omit<IUserBase, "id"> {}
