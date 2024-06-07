import axios, { AxiosRequestConfig } from "axios";

export interface IApiRequest {
  method?: 'get' | 'post' | 'put' | 'delete' | undefined;
  url: string;
  headers?: object | undefined;
  body?: any | undefined;
  withAuthToken?: boolean;
}

export async function fetcher({ ...props }: IApiRequest): Promise<any> {
    const options: AxiosRequestConfig = {
        method: props.method,
        baseURL: 'http://172.30.112.1:3000',
        url: props.url,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            ...props.headers
        },
        data: props.body,
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        throw error
    }
}