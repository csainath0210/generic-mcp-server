import { ApiResponse } from "../types.js";
import { movieApiClient } from "../api.js";

interface PersonResult {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  known_for?: {
    id: number;
    title?: string;
    name?: string;
    media_type: string;
  }[];
}

export interface SearchPersonResponse {
  page: number;
  results: PersonResult[];
  total_pages: number;
  total_results: number;
}

export interface SearchPersonParams {
  query: string;
  include_adult?: boolean;
  language?: string;
  page?: number;
}

/**
 * Search for people in the movie database
 * @param params Search parameters
 * @returns Promise with person search results
 */
export const searchPerson = async (
  params: SearchPersonParams
): Promise<ApiResponse<SearchPersonResponse>> => {
  try {
    if (!params.query) {
      console.error('searchPerson helper: Missing required query parameter');
      return {
        data: { page: 0, results: [], total_pages: 0, total_results: 0 },
        error: "Search query is required",
        status: 400
      };
    }

    // Build URL with query parameters
    const queryParams = new URLSearchParams();
    
    // Add all parameters to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    // Use the movieApiClient to make the request to the search endpoint
    const headers = {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    };
    
    console.log('searchPerson helper: Making request with headers:', {
      'Authorization': 'Bearer ***' // Don't log the actual token
    });
    console.log('searchPerson helper: Query params:', queryParams.toString());
    console.log('searchPerson helper: ACCESS_TOKEN available:', !!process.env.ACCESS_TOKEN);
    
    const endpoint = `/search/person?${queryParams.toString()}`;
    console.log('searchPerson helper: Calling endpoint:', endpoint);
    
    try {
      const response = await movieApiClient.get<SearchPersonResponse>(
        endpoint,
        { headers }
      );
      
      console.log('searchPerson helper: Response status:', response.status);
      if (response.error) {
        console.error('searchPerson helper: Error in response:', response.error);
      } else {
        console.log('searchPerson helper: Found results:', response.data?.results?.length || 0);
      }
      
      return response;
    } catch (apiError) {
      console.error('searchPerson helper: Error calling movieApiClient:', apiError);
      throw apiError;
    }
  } catch (error) {
    console.error('searchPerson helper: Exception caught:', error);
    return {
      data: { page: 0, results: [], total_pages: 0, total_results: 0 },
      error: error instanceof Error ? error.message : "Unknown error occurred",
      status: 500
    };
  }
}; 