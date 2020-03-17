export interface State {
    cases: number;
    infected: number;
    recovered: number;
    deaths: number;
}

export interface Config {
    developmentMode: boolean;
    pushoverToken: {
        application: string;
        user: string;
    }
    APIrequestInterval: number;
}

export interface PushoverMessage {
    message: string;
    title: string;
    priority: number;
}