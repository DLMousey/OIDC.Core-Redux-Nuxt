export default defineNuxtRouteMiddleware((to) => {
    console.log('running auth middleware');
    if (import.meta.server) {
        console.warn('running on server, refusing to run');
        return;
    }

    const config = useRuntimeConfig();
    const router = useRouter();
    const routes: string[] = config.public.authless_routes;

    let allow: boolean = true;

    if (!routes.includes(to.path)) {
        const at: string | null = sessionStorage.getItem('_oidc.core.at');
        const rt: string | null = sessionStorage.getItem('_oidc.core.rt');

        let expVal: string|null = sessionStorage.getItem('_oidc.core.exp');
        let exp: number | null = null;
        if (expVal != null && expVal != "NaN") {
            exp = new Date(parseInt(expVal, 10)).valueOf();
        }

        if (expVal == "NaN") {
            console.warn('Removing invalid expiry time value');
            sessionStorage.removeItem('_oidc.core.exp')
            expVal = null;
            exp = null;
        }

        if (!at || !rt || !exp) {
            allow = false;
        }

        if (exp != null && exp < new Date().valueOf()) {
            console.warn('Potentially expired access token detected', { exp, date: new Date().valueOf()});
        //     allow = false;
        }
    } else {
        return;
    }

    if (!allow) {
        return navigateTo({
            path: '/login',
            query: {
                redirectTo: router.currentRoute.value.fullPath
            }
        });
    }
})