export interface ProjectDTO {
    _id?: string;
    name: string;
    status: string;
    isChoosen: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}