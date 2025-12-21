# Climatic Beats 🌤️🎵

A production-ready weather-based music recommendation platform that provides personalized Spotify music recommendations based on real-time weather conditions.

## Features

- 🔐 **Secure Authentication**: Email-password authentication with BCrypt hashing and JWT tokens
- 🌍 **Weather Integration**: Real-time weather data from OpenWeatherMap API
- 🎵 **Music Recommendations**: Spotify music recommendations mapped to weather conditions
- 📊 **User History**: Track search and recommendation history per user
- 🎨 **Modern UI**: Dark, music-app-style design with gradients and smooth animations
- 🔒 **Protected Routes**: JWT-based route protection
- 📱 **Responsive Design**: Fully responsive across all devices

## Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT + BCrypt)
- **Spring Data JPA**
- **MySQL**
- **WebFlux** (for API calls)

### Frontend
- **React 18**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Axios**

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 18+ and npm
- MySQL 8.0+
- OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))
- Spotify API credentials ([Get them here](https://developer.spotify.com/dashboard))

## Setup Instructions

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE climatic_beats;
```

The application will automatically create tables on first run (using `spring.jpa.hibernate.ddl-auto=update`).

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Configure environment variables in `src/main/resources/application.properties` or set them as system environment variables:

```properties
# Database
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

# JWT Secret (use a strong 32+ character secret in production)
JWT_SECRET=your-256-bit-secret-key-change-in-production-minimum-32-characters

# OpenWeatherMap API
WEATHER_API_KEY=your_openweathermap_api_key

# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

3. Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication (Public)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/health` - Health check

### Weather (Protected)
- `GET /api/weather/search?city={city}` - Get weather for a city

### Recommendations (Protected)
- `GET /api/recommendations/city?city={city}` - Get weather and music recommendations

### History (Protected)
- `GET /api/history/searches` - Get user's search history
- `GET /api/history/recommendations` - Get user's recommendation history

### Health
- `GET /api/health` - API health check

## Weather to Music Mapping

- **Rain/Drizzle** → Chill/Lo-fi
- **Clear/Sunny** → Pop/Dance
- **Clouds** → Indie
- **Snow** → Classical
- **Thunderstorm** → Intense/Rock
- **Mist/Fog/Haze** → Chill
- **Default** → Top Hits

## Database Schema

### Users Table
- `id` (BIGINT, Primary Key)
- `email` (VARCHAR(100), Unique)
- `password` (VARCHAR, BCrypt hashed)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `created_at` (TIMESTAMP)

### Search History Table
- `id` (BIGINT, Primary Key)
- `user_id` (BIGINT, Foreign Key)
- `city` (VARCHAR)
- `country_code` (VARCHAR(2))
- `searched_at` (TIMESTAMP)

### Recommendation History Table
- `id` (BIGINT, Primary Key)
- `user_id` (BIGINT, Foreign Key)
- `city` (VARCHAR)
- `weather_condition` (VARCHAR)
- `temperature` (DOUBLE)
- `music_genre` (VARCHAR)
- `recommended_at` (TIMESTAMP)

## Project Structure

```
climatic-beats/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/climaticbeats/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── exception/       # Exception handlers
│   │   │   │   ├── repository/      # JPA repositories
│   │   │   │   ├── security/        # Security components
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── context/                 # React context (Auth)
│   │   ├── pages/                   # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Environment Variables

### Backend (.env or application.properties)

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_USERNAME` | MySQL username | Yes |
| `DB_PASSWORD` | MySQL password | Yes |
| `JWT_SECRET` | Secret key for JWT signing (32+ chars) | Yes |
| `WEATHER_API_KEY` | OpenWeatherMap API key | Yes |
| `SPOTIFY_CLIENT_ID` | Spotify Client ID | Yes |
| `SPOTIFY_CLIENT_SECRET` | Spotify Client Secret | Yes |

## Security Features

- **BCrypt Password Hashing**: All passwords are hashed using BCrypt
- **JWT Authentication**: Stateless authentication with JWT tokens
- **Protected Routes**: Backend endpoints protected with Spring Security
- **CORS Configuration**: Configured for frontend origin
- **Input Validation**: Request validation using Jakarta Validation

## Running in Production

### Backend
1. Build the JAR:
```bash
cd backend
mvn clean package
```

2. Run the JAR:
```bash
java -jar target/climatic-beats-backend-1.0.0.jar
```

### Frontend
1. Build for production:
```bash
cd frontend
npm run build
```

2. Serve the `dist` folder using a web server (nginx, Apache, etc.)

## Troubleshooting

### Backend Issues
- **Port 8080 already in use**: Change `server.port` in `application.properties`
- **Database connection failed**: Verify MySQL is running and credentials are correct
- **API key errors**: Ensure all API keys are set correctly in environment variables

### Frontend Issues
- **CORS errors**: Ensure backend CORS configuration includes your frontend URL
- **API calls failing**: Verify backend is running on port 8080
- **Build errors**: Run `npm install` again to ensure all dependencies are installed

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

