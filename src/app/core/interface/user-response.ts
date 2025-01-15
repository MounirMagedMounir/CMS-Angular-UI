export interface UserResponse {
    id: number;
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
    createdbyId: number;
    createdByName: string;
    lastUpdatedbyId: number;
    lastUpdatedByName: string;
}
