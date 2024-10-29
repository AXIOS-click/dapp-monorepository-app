import { Role } from '../aggregates/roles.aggregate';

export interface IRolesRepository {
  getAllRoles(): Promise<Role[]>;
}
