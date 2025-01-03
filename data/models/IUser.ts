export default interface IUser {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date | undefined;
};