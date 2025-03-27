import { deepMerge } from "@/core/utils/deepmerge";
import { IHttpClient } from "../ports/http-client";

export class FetchHttpClient implements IHttpClient {
  constructor(private readonly baseUrl: string) {}

  async request<T = unknown>(
    method: string,
    url: string,
    overrideRequestInit: RequestInit = {},
  ) {
    const initialRequestInit: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${this.baseUrl}${url}`,
      deepMerge(initialRequestInit, overrideRequestInit),
    );

    let resBody = await res.text()
    try {
      resBody = JSON.parse(resBody)
    } catch (error) {}

    if (!res.ok) {
      const formattedError = this.formatError(resBody);
      throw new Error(formattedError);
    }

    return resBody as T;
  }

  private formatError(resBody: unknown): string {
    if (!resBody) return "Unknown error";

    if (typeof resBody === "string") return resBody;

    if (typeof resBody !== "object") {
      return JSON.stringify(resBody);
    }

    if (
      "message" in resBody &&
      Array.isArray(resBody.message) &&
      resBody.message.every((m) => typeof m === "string")
    ) {
      return resBody.message.join(", ");
    }

    return JSON.stringify(resBody);
  }
}
