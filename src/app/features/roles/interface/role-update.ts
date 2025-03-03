import { RolePermission } from "./role-permission";

export interface RoleUpdate {
    id: string|null;
    name: string|null;
    permissions: RolePermission[];
}
