import axios from "axios";
import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

type RequestInterceptorConfig = {
  onFulfilled?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onRejected?: (error: AxiosError) => Promise<never>;
};

type ResponseInterceptorConfig = {
  onFulfilled?: (
    response: AxiosResponse,
  ) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: AxiosError) => Promise<never>;
};

type InterceptorConfig = {
  request?: RequestInterceptorConfig;
  response?: ResponseInterceptorConfig;
};

type CreateApiClientOptions = {
  baseURL: string;
  axiosConfig?: AxiosRequestConfig;
  interceptors?: InterceptorConfig;
};

export const createApiClient = ({
  baseURL,
  axiosConfig,
  interceptors,
}: CreateApiClientOptions) => {
  const client = axios.create({
    timeout: 10000,
    baseURL,
    ...axiosConfig,
  });

  if (interceptors?.request) {
    client.interceptors.request.use(
      interceptors.request.onFulfilled,
      interceptors.request.onRejected,
    );
  }

  if (interceptors?.response) {
    client.interceptors.response.use(
      interceptors.response.onFulfilled,
      interceptors.response.onRejected,
    );
  }

  return client;
};
