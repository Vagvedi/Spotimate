package com.climaticbeats.controller;

import com.climaticbeats.dto.WeatherResponse;
import com.climaticbeats.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/search")
    public ResponseEntity<?> getWeather(@RequestParam String city, Authentication authentication) {
        try {
            String email = authentication != null ? ((UserDetails) authentication.getPrincipal()).getUsername() : null;
            WeatherResponse response = weatherService.getWeather(city, email);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    private static class ErrorResponse {
        private String error;
        public ErrorResponse(String error) { this.error = error; }
        public String getError() { return error; }
    }
}

