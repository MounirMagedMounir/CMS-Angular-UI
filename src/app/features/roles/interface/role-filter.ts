import { PermissionFilter } from "../../permissions/interface/permission-filter";

export interface RoleFilter {
    
        id: string | null;
        createdDateFrom:  Date | null;
        createdDateTo:  Date | null;
        lastUpdatedDateFrom:  Date | null;
        lastUpdatedDateTo:  Date | null;
        createdbyId: string | null;
        createdbyName: string | null;
        lastUpdatedbyId: string | null;
        lastUpdatedbyName: string | null;
        name: string | null;
        permissions: Array<PermissionFilter>;
      
}
