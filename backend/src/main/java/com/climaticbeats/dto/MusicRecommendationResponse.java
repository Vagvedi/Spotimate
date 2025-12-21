package com.climaticbeats.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MusicRecommendationResponse {
    private String genre;
    private String weatherCondition;
    private List<Track> tracks;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Track {
        private String id;
        private String name;
        private String artist;
        private String album;
        private String previewUrl;
        private String externalUrl;
        private String imageUrl;
    }
}

