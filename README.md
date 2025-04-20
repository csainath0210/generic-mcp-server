# TypeScript MCP Server

A Model Context Protocol (MCP) server implementation using TypeScript and Express for movie database access.

## What is MCP?

The Model Context Protocol (MCP) enables AI models to interact with external systems in a standardized way. It provides a framework for defining resources, tools, and prompts that LLMs can use to perform tasks.

For more information, visit the [Model Context Protocol repository](https://github.com/modelcontextprotocol/typescript-sdk).

## Features

- Implements the MCP protocol for LLM interactions
- Enables movie database searches and film discovery
- Uses Express for HTTP handling
- Supports Server-Sent Events (SSE) for real-time communication
- Includes a client example for testing

## Requirements

- Node.js 18+
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the `.env.example` template:

```bash
cp .env.example .env
```

4. Update the `.env` file with your API configuration:

```
# API configuration
PORT=8089
ACCESS_TOKEN=your_movie_db_access_token
```

## Running the Server

Start the development server with:

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```

The server will run on port 8089 by default. You can change this by setting the `PORT` environment variable in the `.env` file.

## API Endpoints

- `GET /sse`: Server-Sent Events endpoint for MCP communication
- `POST /messages`: Endpoint for clients to send messages to the MCP server

## Available Resources

- `greeting://welcome`: A static welcome message
- `users://{userId}`: A dynamic resource that returns user data

## Available Tools

### Movie Database

- `movie_database_search_person`: Search for actors, directors, and other film industry professionals with comprehensive biographical information and filmography details
- `movie_database_discover_films`: Explore films with advanced filtering options including cast, genres, release dates, and ratings

## Available Prompts

- `greeting`: A friendly greeting message for users
- `help`: Provides help information about available commands
- `ask-question`: A prompt template for asking questions
- `error`: Handles error messages gracefully

## Available Interfaces

The project includes typed interfaces for API responses:

- `ApiResponse<T>`: Generic API response wrapper with data, error, and status fields
- `ApiConfig`: Configuration for API client with baseUrl and optional headers

These interfaces help ensure type safety when working with API data.

## Environment Variables

The server requires the following environment variables:

- `PORT`: The port to run the server on (default: 8089)
- `ACCESS_TOKEN`: API token for accessing movie database services (required)

## Movie Database Features

The server provides access to The Movie Database (TMDB) API with the following capabilities:

- Search for film industry professionals including actors and directors
- Discover movies with extensive filtering options:
  - By release date, popularity, or rating
  - By cast or crew members
  - By genres, keywords, or companies
  - By runtime or language
  - By monetization type (free, subscription, rental, etc.)

## Testing with the Example Client

The repository includes an example client that demonstrates how to connect to the MCP server and use its resources, tools, and prompts.

To run the example client (with the server already running):

```bash
npm run client
```

This will:

1. Connect to the MCP server
2. List available resources, tools, and prompts
3. Read the greeting resource
4. Use the available tools
5. Get the ask-question prompt

## Usage with LLMs

This MCP server can be used with LLM clients that support the MCP protocol. Refer to the MCP documentation for information on how to connect LLM clients to this server.

## License

MIT
