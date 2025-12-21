package com.climaticbeats.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "recommendation_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String city;
    
    @Column(name = "weather_condition", nullable = false)
    private String weatherCondition;
    
    @Column(name = "temperature")
    private Double temperature;
    
    @Column(name = "music_genre", nullable = false)
    private String musicGenre;
    
    @Column(name = "recommended_at", nullable = false, updatable = false)
    private LocalDateTime recommendedAt;
    
    @PrePersist
    protected void onCreate() {
        recommendedAt = LocalDateTime.now();
    }
}

