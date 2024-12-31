import {useFetch, useFetchConfig} from "#imports";
import type {UseFetchOptions} from "#app";
import type IAuthRefreshResponse from "~/data/models/IAuthRefreshResponse";
import type {_AsyncData} from "#app/composables/asyncData";

export const useFetchWithRefresh = async (url: string, originalOptions: UseFetchOptions<object>) => {
    return useFetch(url, {
        ...originalOptions,
        async onResponseError({response }) {
            if (response.status != 401) {
                return response;
            }

            console.log('Caught 401');
            const rt: string | null = sessionStorage.getItem('_oidc.core.rt');
            if (rt == null) {
                console.warn('No refresh token in session storage, cannot attempt refresh');
                return response;
            }

            console.log('performing refresh');
            const config = useFetchConfig('/authentication/refresh', {
                method: 'POST',
                body: { refreshToken: rt }
            });
            const refreshResponse: _AsyncData<IAuthRefreshResponse, Error | null> = await useFetch(config.url, config.config);
            if (!refreshResponse) {
                console.error(refreshResponse);
                return response;
            }

            console.log('got new access token', refreshResponse.data.value.access_token);
            let expVal: string|null = refreshResponse.data.value.expires_in.toString(10);
            let exp: number | null = null;
            if (expVal != null && expVal != "NaN") {
                exp = new Date(parseInt(expVal, 10)).valueOf();
                sessionStorage.setItem('_oidc.core.exp', JSON.stringify(exp));
            }

            console.log('updating session storage');
            sessionStorage.setItem('_oidc.core.at', refreshResponse.data.value.access_token);

            // Father forgive me for i have ts-ignored
            // @ts-ignore
            originalOptions.headers!.Authorization = `Bearer ${sessionStorage.getItem('_oidc.core.at')}`;
            return await useFetch(url, originalOptions);
        }
    });
}