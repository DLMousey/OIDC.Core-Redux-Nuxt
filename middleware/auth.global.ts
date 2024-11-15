export default defineNuxtRouteMiddleware((to) => {
    console.log('running auth middleware');

    if (import.meta.server) {
        return;
    }

    const config = useRuntimeConfig();
    const routes: string[] = config.public.authless_routes;

    let allow: boolean = true;

    if (!routes.includes(to.path)) {
        const at: string | null = sessionStorage.getItem('_oidc.core.at');
        const rt: string | null = sessionStorage.getItem('_oidc.core.rt');
        const exp: number | null = new Date(sessionStorage.getItem('_oidc.core.exp'));

        if (!at || !rt || !exp) {
            allow = false;
        }

        if (exp < new Date().valueOf()) {
            allow = false;
        }
    } else {
        return;
    }

    if (!allow) {
        return navigateTo('/login');
    }
})