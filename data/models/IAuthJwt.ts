export default interface IAuthJwt {
    jti: string;
    email: string;
    sub: string;
    auth_time: Date;
    username: string;
    roles: string;
    exp: number;
    iss: string;
    aud: string;
}