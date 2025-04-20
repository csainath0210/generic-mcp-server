import { z } from "zod";
import { server } from "./server.js";
import { discoverMovie } from "../helpers/discoverMovie.js";
import { searchPerson } from "../helpers/searchPerson.js";
import https from 'node:https';


// Movie Database Person Search tool
server.tool(
  "movie_database_search_person",
  "Search for actors, directors, and other film industry professionals with comprehensive biographical information and filmography details",
  {
    query: z.string().describe("The search query for finding a person"),
    include_adult: z.boolean().optional().describe("Include adult content in results"),
    language: z.string().optional().describe("Language to use for results (e.g., en-US)"),
    page: z.number().optional().describe("Page number for pagination")
  },
  async (params) => {
    try {
      console.log("Movie database person search called with params:", JSON.stringify(params));
      const queryParams = new URLSearchParams();
      
      // Add all parameters to query string
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
      
      // Check if ACCESS_TOKEN is available
      const token = process.env.ACCESS_TOKEN;
      if (!token) {
        console.error("ACCESS_TOKEN is not set in environment variables");
        return {
          content: [{
            type: "text",
            text: "Failed to search for person: Missing API access token"
          }],
          isError: true
        };
      }

      const url = `https://api.themoviedb.org/3/search/person?${queryParams.toString()}`;
      console.log("Making request to URL:", url);
      
      // For Node.js environments, set the NODE_TLS_REJECT_UNAUTHORIZED environment variable
      // This is a global setting, so we'll restore it after our fetch
      const originalValue = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      try {
        const response = await fetch(
          url,
          {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", response.status, errorText);
          throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
        }
        
        const data = await response.json();
        console.log("API response successful, found", data?.results?.length || 0, "results");
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify(data, null, 2)
          }]
        };
      } finally {
        // Restore the original value
        if (originalValue === undefined) {
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
        } else {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalValue;
        }
      }
    } catch (error) {
      console.error("Exception in movie database person search:", error);
      return {
        content: [{
          type: "text",
          text: "Failed to search for person: " + (error instanceof Error ? error.message : "Unknown error")
        }],
        isError: true
      };
    }
  }
);

// Movie Database Film Discovery tool
server.tool(
  "movie_database_discover_films",
  "Explore films with advanced filtering options including cast, genres, release dates, and ratings to find exactly what you're looking for",
  {
    include_adult: z.boolean().optional().describe("Include adult content in results"),
    include_video: z.boolean().optional().describe("Include videos in results"),
    language: z.string().optional().describe("Language to use for results (e.g., en-US)"),
    page: z.number().optional().describe("Page number for pagination"),
    primary_release_year: z.number().optional().describe("Filter by primary release year"),
    primary_release_date_gte: z.string().optional().describe("Filter by primary release date (greater than or equal, format: YYYY-MM-DD)"),
    primary_release_date_lte: z.string().optional().describe("Filter by primary release date (less than or equal, format: YYYY-MM-DD)"),
    region: z.string().optional().describe("Filter by region"),
    release_date_gte: z.string().optional().describe("Filter by release date (greater than or equal, format: YYYY-MM-DD)"),
    release_date_lte: z.string().optional().describe("Filter by release date (less than or equal, format: YYYY-MM-DD)"),
    sort_by: z.string().optional().describe("Sort results by (e.g., popularity.desc, release_date.desc)"),
    vote_average_gte: z.number().optional().describe("Filter by vote average (greater than or equal)"),
    vote_average_lte: z.number().optional().describe("Filter by vote average (less than or equal)"),
    vote_count_gte: z.number().optional().describe("Filter by vote count (greater than or equal)"),
    vote_count_lte: z.number().optional().describe("Filter by vote count (less than or equal)"),
    watch_region: z.string().optional().describe("Filter by watch region"),
    with_cast: z.string().optional().describe("Filter by cast (comma-separated for AND, pipe-separated for OR)"),
    with_companies: z.string().optional().describe("Filter by companies (comma-separated for AND, pipe-separated for OR)"),
    with_crew: z.string().optional().describe("Filter by crew (comma-separated for AND, pipe-separated for OR)"),
    with_genres: z.string().optional().describe("Filter by genres (comma-separated for AND, pipe-separated for OR)"),
    with_keywords: z.string().optional().describe("Filter by keywords (comma-separated for AND, pipe-separated for OR)"),
    with_origin_country: z.string().optional().describe("Filter by origin country"),
    with_original_language: z.string().optional().describe("Filter by original language"),
    with_people: z.string().optional().describe("Filter by people (comma-separated for AND, pipe-separated for OR)"),
    with_release_type: z.union([z.number(), z.string()]).optional().describe("Filter by release type (1-6, comma-separated for AND, pipe-separated for OR)"),
    with_runtime_gte: z.number().optional().describe("Filter by runtime in minutes (greater than or equal)"),
    with_runtime_lte: z.number().optional().describe("Filter by runtime in minutes (less than or equal)"),
    with_watch_monetization_types: z.string().optional().describe("Filter by monetization types (flatrate, free, ads, rent, buy)"),
    with_watch_providers: z.string().optional().describe("Filter by watch providers (comma-separated for AND, pipe-separated for OR)"),
    without_companies: z.string().optional().describe("Exclude companies (comma-separated)"),
    without_genres: z.string().optional().describe("Exclude genres (comma-separated)"),
    without_keywords: z.string().optional().describe("Exclude keywords (comma-separated)"),
    without_watch_providers: z.string().optional().describe("Exclude watch providers (comma-separated)"),
    year: z.number().optional().describe("Filter by year")
  },
  async (params) => {
    try {
      console.log("Movie database film discovery called with params:", JSON.stringify(params));
      const queryParams = new URLSearchParams();
      
      // Add all parameters to query string
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
      
      // Check if ACCESS_TOKEN is available
      const token = process.env.ACCESS_TOKEN;
      if (!token) {
        console.error("ACCESS_TOKEN is not set in environment variables");
        return {
          content: [{
            type: "text",
            text: "Failed to discover films: Missing API access token"
          }],
          isError: true
        };
      }

      const url = `https://api.themoviedb.org/3/discover/movie?${queryParams.toString()}`;
      console.log("Making request to URL:", url);
      
      // For Node.js environments, set the NODE_TLS_REJECT_UNAUTHORIZED environment variable
      // This is a global setting, so we'll restore it after our fetch
      const originalValue = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      
      try {
        const response = await fetch(
          url,
          {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", response.status, errorText);
          throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
        }
        
        const data = await response.json();
        console.log("API response successful, found", data?.results?.length || 0, "results");
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify(data, null, 2)
          }]
        };
      } finally {
        // Restore the original value
        if (originalValue === undefined) {
          delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
        } else {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalValue;
        }
      }
    } catch (error) {
      console.error("Exception in movie database film discovery:", error);
      return {
        content: [{
          type: "text",
          text: "Failed to discover films: " + (error instanceof Error ? error.message : "Unknown error")
        }],
        isError: true
      };
    }
  }
);

