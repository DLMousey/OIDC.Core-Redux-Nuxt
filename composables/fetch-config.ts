export const useFetchConfig = (path: string, config: {}): { url: string, config: object } => {
    const c = useRuntimeConfig();
    const url = `${c.public.api.protocol}://${c.public.api.domain}${path.startsWith('/') ? '' : '/'}${path}`;

    if (!import.meta.server) {
        // @ts-ignore
        config.headers = {
            'Authorization': `Bearer ${sessionStorage.getItem('_oidc.core.at')}`
        };
    }

    return {
        url,
        config
    };
}