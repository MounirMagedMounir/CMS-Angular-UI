import { PermissionCreate } from "../../permissions/interface/permission-create";

export interface RoleCreate {
    name: string|null;
    permissions: PermissionCreate[];
}
