export interface IAuthGateway {
    Login: (name: string, email: string) => Promise<any>;
}