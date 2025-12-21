package com.climaticbeats.service;

import com.climaticbeats.dto.MusicRecommendationResponse;
import com.climaticbeats.dto.WeatherResponse;
import com.climaticbeats.entity.RecommendationHistory;
import com.climaticbeats.entity.User;
import com.climaticbeats.repository.RecommendationHistoryRepository;
import com.climaticbeats.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class RecommendationService {

    @Autowired
    private SpotifyService spotifyService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecommendationHistoryRepository recommendationHistoryRepository;

    private static final Map<String, String> WEATHER_TO_GENRE = new HashMap<>();

    static {
        WEATHER_TO_GENRE.put("Rain", "chill");
        WEATHER_TO_GENRE.put("Drizzle", "lo-fi");
        WEATHER_TO_GENRE.put("Clear", "pop");
        WEATHER_TO_GENRE.put("Clouds", "indie");
        WEATHER_TO_GENRE.put("Snow", "classical");
        WEATHER_TO_GENRE.put("Thunderstorm", "intense");
        WEATHER_TO_GENRE.put("Mist", "chill");
        WEATHER_TO_GENRE.put("Fog", "chill");
        WEATHER_TO_GENRE.put("Haze", "chill");
    }

    @Transactional
    public MusicRecommendationResponse getRecommendations(WeatherResponse weather, String email) {
        String condition = weather.getCondition();
        String genre = WEATHER_TO_GENRE.getOrDefault(condition, "top hits");

        MusicRecommendationResponse recommendation = spotifyService.getRecommendations(genre, condition);

        // Save recommendation history
        if (email != null) {
            User user = userRepository.findByEmail(email)
                    .orElse(null);
            if (user != null) {
                RecommendationHistory history = new RecommendationHistory();
                history.setUser(user);
                history.setCity(weather.getCity());
                history.setWeatherCondition(condition);
                history.setTemperature(weather.getTemperature());
                history.setMusicGenre(genre);
                recommendationHistoryRepository.save(history);
            }
        }

        return recommendation;
    }
}

