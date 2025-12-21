package com.climaticbeats.controller;

import com.climaticbeats.dto.MusicRecommendationResponse;
import com.climaticbeats.dto.WeatherResponse;
import com.climaticbeats.service.RecommendationService;
import com.climaticbeats.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin(origins = "*")
public class RecommendationController {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/city")
    public ResponseEntity<?> getRecommendationsByCity(@RequestParam String city, Authentication authentication) {
        try {
            String email = authentication != null ? ((UserDetails) authentication.getPrincipal()).getUsername() : null;
            
            // Get weather first
            WeatherResponse weather = weatherService.getWeather(city, email);
            
            // Get music recommendations based on weather
            MusicRecommendationResponse recommendations = recommendationService.getRecommendations(weather, email);
            
            CombinedResponse response = new CombinedResponse();
            response.setWeather(weather);
            response.setRecommendations(recommendations);
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    private static class CombinedResponse {
        private WeatherResponse weather;
        private MusicRecommendationResponse recommendations;
        
        public WeatherResponse getWeather() { return weather; }
        public void setWeather(WeatherResponse weather) { this.weather = weather; }
        public MusicRecommendationResponse getRecommendations() { return recommendations; }
        public void setRecommendations(MusicRecommendationResponse recommendations) { this.recommendations = recommendations; }
    }

    private static class ErrorResponse {
        private String error;
        public ErrorResponse(String error) { this.error = error; }
        public String getError() { return error; }
    }
}

