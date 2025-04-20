# Generic MCP Server

A production-ready Model Context Protocol (MCP) server implementation built with TypeScript and Express, designed to seamlessly connect AI agents with external APIs.

## Overview

This project demonstrates how to implement a Server-Sent Events (SSE) MCP server using the `@modelcontextprotocol/sdk`. It provides developers with a practical reference for exposing APIs to AI agents and Large Language Models (LLMs) with a focus on movie database interactions.

The implementation details can be found in `src/mcp/tools.ts`, `src/mcp/prompts.ts`, `src/helpers/` directory, and related files.

## What is MCP?

The Model Context Protocol (MCP) establishes a standardized interface for AI models to interact with external systems securely and efficiently. It defines a structured framework for:

- **Resources**: Data objects that models can access
- **Tools**: Executable functions that models can invoke
- **Prompts**: Templates that guide model interactions

This standardization simplifies the integration of AI capabilities into existing applications and services.

For comprehensive documentation, visit the [Model Context Protocol repository](https://github.com/modelcontextprotocol/typescript-sdk).

## Key Features

- Full implementation of the MCP specification
- Real-time communication via Server-Sent Events (SSE)
- Modular architecture for easy extension
- Built-in movie database integration for searching people and discovering films
- Type-safe interfaces for API responses
- Comprehensive error handling
- Example client for testing and reference

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/generic-mcp-server.git
   cd generic-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment:
   ```bash
   cp .env.example .env
   ```

4. Add your API credentials to the `.env` file:
   ```
   PORT=8089
   ACCESS_TOKEN=your_movie_db_access_token
   ```

### Running the Server

Development mode with hot reloading:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The server will be available at `http://localhost:8089` (or the port specified in your `.env` file).

## API Reference

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/sse` | GET | Server-Sent Events endpoint for MCP communication |
| `/messages` | POST | Endpoint for clients to send messages to the MCP server |

### MCP Components

#### Resources

- `greeting://welcome`: Static welcome message
- `users://{userId}`: Dynamic user data resource

#### Tools

The server implements powerful movie database tools:

- **movie_database_search_person**: Search for actors, directors, and film professionals with detailed information about their careers, biographical data, and filmographies.
- **movie_database_discover_films**: Advanced film discovery with filtering by cast, genres, release dates, ratings, and more.

#### Prompts

- `greeting`: Friendly user greeting
- `help`: Detailed command assistance
- `ask-question`: Question template for guiding conversations
- `error`: Graceful error handling prompt

## Movie Database Features

The server provides access to The Movie Database (TMDB) API with the following capabilities:

- **Search for film industry professionals** including actors and directors
- **Discover movies** with extensive filtering options:
  - By release date, popularity, or rating
  - By cast or crew members
  - By genres, keywords, or companies
  - By runtime or language
  - By monetization type (free, subscription, rental, etc.)

## Environment Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | 8089 |
| `ACCESS_TOKEN` | Authentication token for movie database API | required |

## Testing with the Example Client

The repository includes a demonstration client that shows how to connect to and interact with the MCP server:

```bash
npm run client
```

The client will:
- Establish a connection to the server
- Display available resources, tools, and prompts
- Read the greeting resource
- Demonstrate tool usage
- Retrieve prompt templates

## Integrating with AI Models

This server can be integrated with any LLM that supports the MCP protocol. The standardized interface ensures compatibility with various AI frameworks and platforms.

## Architecture

The project follows a modular architecture:
- `src/mcp/`: Core MCP protocol implementations
- `src/helpers/`: API-specific helper functions
- `src/utils/`: Utility functions and shared code
- `src/types.ts`: TypeScript interface definitions

## Available Interfaces

The project includes typed interfaces for API responses:

- `ApiResponse<T>`: Generic API response wrapper with data, error, and status fields
- `ApiConfig`: Configuration for API client with baseUrl and optional headers

These interfaces help ensure type safety when working with API data.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
