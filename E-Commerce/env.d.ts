declare namespace NodeJS{
    interface ProcessEnv{
        readonly PORT:number;
        readonly DB:string;
        readonly NODE_ENV:'development' | 'product';
        readonly BASE_URL:string;
        readonly JWT_KEY:string;
        readonly JWT_EXPIRED:string;
        readonly JWT_RESET_EXPIRED: string;
        readonly EMAIL_HOST: string;
        readonly EMAIL_USERNAME: string;
        readonly EMAIL_PASSWORD: string;
        readonly APP_NAME: string;

    }
}