export const useAuth = () => useState<boolean>('authenticated', () => {
    if (import.meta.server) {
        return true;
    }

    const at: string | null = sessionStorage.getItem('_oidc.core.at');
    const rt: string | null = sessionStorage.getItem('_oidc.core.rt');
    const exp: number | null = new Date(sessionStorage.getItem('_oidc.core.exp'));

    return !(!at || !rt || !exp);
})