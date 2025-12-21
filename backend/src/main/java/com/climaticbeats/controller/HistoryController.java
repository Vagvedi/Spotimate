package com.climaticbeats.controller;

import com.climaticbeats.entity.RecommendationHistory;
import com.climaticbeats.entity.SearchHistory;
import com.climaticbeats.repository.RecommendationHistoryRepository;
import com.climaticbeats.repository.SearchHistoryRepository;
import com.climaticbeats.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class HistoryController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SearchHistoryRepository searchHistoryRepository;

    @Autowired
    private RecommendationHistoryRepository recommendationHistoryRepository;

    @GetMapping("/searches")
    public ResponseEntity<?> getSearchHistory(Authentication authentication) {
        try {
            String email = ((UserDetails) authentication.getPrincipal()).getUsername();
            Long userId = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"))
                    .getId();
            
            List<SearchHistory> history = searchHistoryRepository.findByUserIdOrderBySearchedAtDesc(userId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/recommendations")
    public ResponseEntity<?> getRecommendationHistory(Authentication authentication) {
        try {
            String email = ((UserDetails) authentication.getPrincipal()).getUsername();
            Long userId = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"))
                    .getId();
            
            List<RecommendationHistory> history = recommendationHistoryRepository.findByUserIdOrderByRecommendedAtDesc(userId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
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

