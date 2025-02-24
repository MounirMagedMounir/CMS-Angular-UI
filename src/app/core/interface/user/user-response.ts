export interface UserResponse {
    id: string;
    name: string;
    userName: string;
    email: string;
    phone: string;
    password: string;
    profileImage: string;
    isActive: boolean;
    role: string;
    createdDate: Date;
    lastUpdatedDate: Date;
    createdbyId: string;
    createdByName: string;
    lastUpdatedbyId: string;
    lastUpdatedByName: string;
}
