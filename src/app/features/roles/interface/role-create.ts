export interface RoleCreate {
    name: string|null;
    permissions: Permission[]|null;
}
interface Permission {
    name: string|null;
  }