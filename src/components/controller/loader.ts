type RequestOptions = Record<string, string | number>;

interface LoaderParams {
    endpoint: string;
    options?: RequestOptions;
}
//дженерики
type Callback<T> = (data: T) => void;

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: LoaderParams,
        callback: Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }
            throw new Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: RequestOptions = { ...this.options, ...options };
        let url = ${this.baseLink}${endpoint}?;

        Object.keys(urlOptions).forEach((key: string) => {
            url += ${key}=${urlOptions[key]}&;
        });

        return url.slice(0, -1);
    }
//
    private load<T>(
        method: string,
        endpoint: string,
        callback: Callback<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: unknown) => console.error(err));
    }
}

export default Loader;
