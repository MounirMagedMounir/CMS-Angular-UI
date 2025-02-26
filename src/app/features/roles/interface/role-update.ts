export interface RoleUpdate {
    id: string|null;
    name: string|null;
    permissions: Permission[];
}
interface Permission {
    id: string|null;
    name: string|null;
  }