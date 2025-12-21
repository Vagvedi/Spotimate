# Quick Start Guide

## Prerequisites Checklist

- [ ] Java 17+ installed (`java -version`)
- [ ] Maven installed (`mvn -version`)
- [ ] Node.js 18+ installed (`node -v`)
- [ ] MySQL 8.0+ installed and running
- [ ] OpenWeatherMap API key ([Get it here](https://openweathermap.org/api))
- [ ] Spotify API credentials ([Get them here](https://developer.spotify.com/dashboard))

## 5-Minute Setup

### Step 1: Database Setup (1 minute)
```bash
mysql -u root -p
CREATE DATABASE climatic_beats;
exit;
```

### Step 2: Backend Configuration (2 minutes)

1. Edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
WEATHER_API_KEY=YOUR_OPENWEATHERMAP_KEY
SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
```

2. Start the backend:
```bash
cd backend
mvn spring-boot:run
```

Wait for: `Started ClimaticBeatsApplication in X.XXX seconds`

### Step 3: Frontend Setup (2 minutes)

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the frontend:
```bash
npm run dev
```

### Step 4: Access the Application

Open your browser to: `http://localhost:5173`

1. Click "Sign up" to create an account
2. Login with your credentials
3. Search for a city (e.g., "London", "New York", "Tokyo")
4. Enjoy weather-based music recommendations! 🎵

## Troubleshooting

### Backend won't start
- Check MySQL is running: `mysql -u root -p`
- Verify database exists: `SHOW DATABASES;`
- Check port 8080 is free: `netstat -an | grep 8080`

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Check port 5173 is free

### API errors
- Verify all API keys are set correctly
- Check backend logs for detailed error messages
- Ensure backend is running on port 8080

### Database connection errors
- Verify MySQL credentials in `application.properties`
- Check MySQL is running: `sudo systemctl status mysql` (Linux) or `brew services list` (Mac)

## Next Steps

- Customize the weather-to-music mapping in `RecommendationService.java`
- Add more features like favorite tracks, playlists, etc.
- Deploy to production (see README.md for production build instructions)

