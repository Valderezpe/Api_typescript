 export interface HttpResponse<T>{
    params?: any;
    statusCode?: number;
    body: T  | string;
}

export interface HttpRequest<B>{
    params?: any;
    headers?: any;
    body?:B;
}