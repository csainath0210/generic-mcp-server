import { ApiResponse } from "../types.js";
import { movieApiClient } from "../api.js";

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
}

export interface DiscoverMovieParams {
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: number;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  region?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  sort_by?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  vote_count_lte?: number;
  watch_region?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_release_type?: number | string;
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  with_watch_monetization_types?: string;
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
}

/**
 * Discover movies with various filtering options
 * @param params Filter parameters for movie discovery
 * @returns Promise with movie information
 */
export const discoverMovie = async (
  params: DiscoverMovieParams = {}
): Promise<ApiResponse<MovieResponse>> => {
  try {
    // Build URL with query parameters
    const queryParams = new URLSearchParams();
    
    // Add all parameters to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    // Use the movieApiClient to make the request
    const headers = {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    };
    
    console.log('discoverMovie helper: Making request with headers:', {
      'Authorization': 'Bearer ***' // Don't log the actual token
    });
    console.log('discoverMovie helper: Query params:', queryParams.toString());
    console.log('discoverMovie helper: ACCESS_TOKEN available:', !!process.env.ACCESS_TOKEN);
    
    const endpoint = `/discover/movie?${queryParams.toString()}`;
    console.log('discoverMovie helper: Calling endpoint:', endpoint);
    
    try {
      const response = await movieApiClient.get<MovieResponse>(
        endpoint,
        { headers }
      );
      
      console.log('discoverMovie helper: Response status:', response.status);
      if (response.error) {
        console.error('discoverMovie helper: Error in response:', response.error);
      } else {
        console.log('discoverMovie helper: Found results:', response.data?.results?.length || 0);
      }
      
      return response;
    } catch (apiError) {
      console.error('discoverMovie helper: Error calling movieApiClient:', apiError);
      throw apiError;
    }
  } catch (error) {
    console.error('discoverMovie helper: Exception caught:', error);
    return {
      data: { page: 0, results: [] },
      error: error instanceof Error ? error.message : "Unknown error occurred",
      status: 500
    };
  }
}; 