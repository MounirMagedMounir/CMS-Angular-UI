export interface UserFilterResponse {
    id: string | null;

    createdDateFrom: Date | null;

    createdDateTo: Date | null;

    lastUpdatedDateFrom: Date | null;

    lastUpdatedDateTo: Date | null;

    createdbyId: string | null;

    createdbyName: string | null;

    lastUpdatedbyId: string | null;

    lastUpdatedbyName: string | null;

    name: string | null;

    userName: string | null;

    email: string | null;

    phone: string | null;

    isActive: boolean | null;

    roleName: string | null;
}
