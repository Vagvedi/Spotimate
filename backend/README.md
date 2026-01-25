# Climatic Beats Backend

A weather-based music recommendation platform backend built with NestJS, TypeORM, and MySQL.

## Features

- User authentication with JWT
- Weather data integration
- Spotify music recommendations based on weather
- Search and recommendation history tracking
- RESTful API

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL (v5.7 or higher)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory:
```env
NODE_ENV=development
PORT=8080
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=climaticbeats

JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRATION=24h

SPOTIFY_API_CLIENT_ID=your_spotify_client_id
SPOTIFY_API_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_API_TOKEN_URL=https://accounts.spotify.com/api/token
SPOTIFY_API_BASE_URL=https://api.spotify.com/v1

OPEN_WEATHER_API_KEY=your_openweather_api_key
OPEN_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

3. Create the database:
```bash
mysql -u root -p -e "CREATE DATABASE climaticbeats;"
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/health` - Health check

### Weather
- `GET /api/weather/search?city=<city_name>` - Get weather for a city

### Recommendations
- `GET /api/recommendations?city=<city_name>` - Get music recommendations

### History
- `GET /api/history/search` - Get search history
- `GET /api/history/recommendations` - Get recommendation history

### Health
- `GET /api/health` - Health check

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts          # Root module
├── auth/                  # Authentication module
│   ├── dto/              # Data transfer objects
│   ├── entities/         # User entity
│   ├── guards/           # JWT guard
│   ├── strategies/       # JWT strategy
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── weather/              # Weather module
│   ├── dto/
│   ├── weather.controller.ts
│   ├── weather.service.ts
│   └── weather.module.ts
├── recommendation/       # Recommendation module
│   ├── dto/
│   ├── recommendation.controller.ts
│   ├── recommendation.service.ts
│   └── recommendation.module.ts
├── history/             # History module
│   ├── entities/
│   ├── history.controller.ts
│   ├── history.service.ts
│   └── history.module.ts
└── health/              # Health check module
```

## Database Schema

The application uses TypeORM and automatically creates the following tables:
- `users` - User accounts
- `search_history` - Weather search history
- `recommendation_history` - Music recommendation history

## Security

- JWT tokens are used for authentication
- Passwords are hashed using bcryptjs
- CORS is enabled for frontend integration
- Environment variables for sensitive data

## License

This project is licensed under the UNLICENSED license.
