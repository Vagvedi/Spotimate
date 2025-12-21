package com.climaticbeats.service;

import com.climaticbeats.dto.WeatherResponse;
import com.climaticbeats.entity.SearchHistory;
import com.climaticbeats.entity.User;
import com.climaticbeats.repository.SearchHistoryRepository;
import com.climaticbeats.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class WeatherService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SearchHistoryRepository searchHistoryRepository;

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    @Transactional
    public WeatherResponse getWeather(String city, String email) {
        if (apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException("Weather API key is not configured");
        }

        String url = apiUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric";

        Map<String, Object> response = webClientBuilder.build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null) {
            throw new RuntimeException("Failed to fetch weather data");
        }

        Map<String, Object> main = (Map<String, Object>) response.get("main");
        Map<String, Object> weather = ((java.util.List<Map<String, Object>>) response.get("weather")).get(0);
        Map<String, Object> wind = (Map<String, Object>) response.get("wind");
        Map<String, Object> sys = (Map<String, Object>) response.get("sys");

        WeatherResponse weatherResponse = new WeatherResponse();
        weatherResponse.setCity((String) response.get("name"));
        weatherResponse.setCountry((String) sys.get("country"));
        weatherResponse.setCondition((String) weather.get("main"));
        weatherResponse.setDescription((String) weather.get("description"));
        weatherResponse.setTemperature(((Number) main.get("temp")).doubleValue());
        weatherResponse.setFeelsLike(((Number) main.get("feels_like")).doubleValue());
        weatherResponse.setHumidity(((Number) main.get("humidity")).intValue());
        weatherResponse.setWindSpeed(wind.get("speed") != null ? ((Number) wind.get("speed")).doubleValue() : 0.0);
        weatherResponse.setIcon((String) weather.get("icon"));

        // Save search history
        if (email != null) {
            User user = userRepository.findByEmail(email)
                    .orElse(null);
            if (user != null) {
                SearchHistory searchHistory = new SearchHistory();
                searchHistory.setUser(user);
                searchHistory.setCity(weatherResponse.getCity());
                searchHistory.setCountryCode(weatherResponse.getCountry());
                searchHistoryRepository.save(searchHistory);
            }
        }

        return weatherResponse;
    }
}

