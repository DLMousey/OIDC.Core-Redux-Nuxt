export default interface IApplication {
    id: string | null;
    name: string;
    description: string | null;
    homepageUrl: string;
    callbackUrl: string;
    clientId: string | null;
    created: Date | null;
}