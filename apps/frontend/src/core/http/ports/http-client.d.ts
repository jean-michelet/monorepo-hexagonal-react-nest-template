type SupportedMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

export interface IHttpClient {
  request<T>(
    method: SupportedMethod,
    url: string,
    requestInit?: RequestInit,
  ): Promise<T>;
}
