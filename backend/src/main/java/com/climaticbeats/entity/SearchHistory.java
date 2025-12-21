package com.climaticbeats.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "search_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String city;
    
    @Column(name = "country_code", length = 2)
    private String countryCode;
    
    @Column(name = "searched_at", nullable = false, updatable = false)
    private LocalDateTime searchedAt;
    
    @PrePersist
    protected void onCreate() {
        searchedAt = LocalDateTime.now();
    }
}

