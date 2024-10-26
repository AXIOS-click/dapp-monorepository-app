export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public roles: string[],
  ) {}
}
