import { ApiConfig, ApiResponse } from "./types.js";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

export class ApiClient {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
    console.log("ApiClient initialized with baseUrl:", config.baseUrl);
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.config.baseUrl}${endpoint}`;
      console.log(`ApiClient: Making ${options.method || 'GET'} request to: ${url}`);
      
      const headers = {
        "Content-Type": "application/json",
        ...this.config.headers,
        ...options.headers,
      };
      
      console.log("ApiClient: Request headers:", Object.keys(headers).join(', '));

      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log(`ApiClient: Received response with status: ${response.status}`);

      try {
        const data = await response.json();

        if (!response.ok) {
          console.error(`ApiClient: Error response (${response.status}):`, JSON.stringify(data).substring(0, 200) + '...');
          return {
            data: data as T,
            error: response.statusText || JSON.stringify(data),
            status: response.status,
          };
        }

        console.log(`ApiClient: Success response type:`, typeof data);
        return {
          data: data as T,
          status: response.status,
        };
      } catch (jsonError) {
        console.error("ApiClient: Error parsing response JSON:", jsonError);
        return {
          data: null as T,
          error: "Failed to parse response",
          status: response.status,
        };
      }
    } catch (error) {
      console.error("ApiClient: Network or other error:", error);
      return {
        data: null as T,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: 500,
      };
    }
  }

  async get<T>(
    endpoint: string,
    options: { headers?: Record<string, string> } = {}
  ): Promise<ApiResponse<T>> {
    console.log("ApiClient.get called with endpoint:", endpoint);
    return this.fetch<T>(endpoint, {
      method: "GET",
      headers: options.headers,
    });
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    options: { headers?: Record<string, string> } = {}
  ): Promise<ApiResponse<T>> {
    console.log("ApiClient.post called with endpoint:", endpoint);
    return this.fetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: options.headers,
    });
  }
}

// Client for The Movie Database API
// Using the base URL so we can access different endpoints
export const movieApiClient = new ApiClient({
  baseUrl: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});