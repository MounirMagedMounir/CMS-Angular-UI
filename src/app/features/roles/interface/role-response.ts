export interface RoleResponse {
    
        id: string;
        name: string;
        permissions: [
            {
                id: string;
                name: string;
            }
        ];
        createdDate: Date;
        lastUpdatedDate: Date;
        createdbyId: string;
        createdByName: string;
        lastUpdatedbyId: string;
        lastUpdatedByName: string
    
}
