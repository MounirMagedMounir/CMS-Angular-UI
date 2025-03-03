import { RolePermission } from "./role-permission";

export interface RoleResponse {
    
        id: string;
        name: string;
        permissions:Array<RolePermission>;
        createdDate: Date;
        lastUpdatedDate: Date;
        createdbyId: string;
        createdByName: string;
        lastUpdatedbyId: string;
        lastUpdatedByName: string
    
}
