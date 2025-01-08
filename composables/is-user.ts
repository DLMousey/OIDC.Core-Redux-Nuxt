import type IAuthJwt from "~/data/models/IAuthJwt";

export const useIsUser = () => {
    if (import.meta.server) {
        return true;
    }

    const at: string | null = sessionStorage.getItem('_oidc.core.at');
    if (at == null) {
        return false;
    }

    const payload: IAuthJwt = JSON.parse(atob(at.split(".")[1]));
    const roles: string[] = payload.roles.split(",");

    return roles.includes("User");
};