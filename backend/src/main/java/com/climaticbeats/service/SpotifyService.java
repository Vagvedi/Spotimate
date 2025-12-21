package com.climaticbeats.service;

import com.climaticbeats.dto.MusicRecommendationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SpotifyService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Value("${spotify.api.client.id}")
    private String clientId;

    @Value("${spotify.api.client.secret}")
    private String clientSecret;

    @Value("${spotify.api.token.url}")
    private String tokenUrl;

    @Value("${spotify.api.base.url}")
    private String baseUrl;

    private String accessToken;
    private LocalDateTime tokenExpiry;

    private String getAccessToken() {
        if (accessToken != null && tokenExpiry != null && LocalDateTime.now().isBefore(tokenExpiry)) {
            return accessToken;
        }

        if (clientId == null || clientId.isEmpty() || clientSecret == null || clientSecret.isEmpty()) {
            throw new RuntimeException("Spotify API credentials are not configured");
        }

        String credentials = Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes());

        Map<String, Object> response = webClientBuilder.build()
                .post()
                .uri(tokenUrl)
                .header("Authorization", "Basic " + credentials)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue("grant_type=client_credentials")
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null || !response.containsKey("access_token")) {
            throw new RuntimeException("Failed to obtain Spotify access token");
        }

        accessToken = (String) response.get("access_token");
        int expiresIn = ((Number) response.get("expires_in")).intValue();
        tokenExpiry = LocalDateTime.now().plusSeconds(expiresIn - 60); // Refresh 60 seconds before expiry

        return accessToken;
    }

    public MusicRecommendationResponse getRecommendations(String genre, String weatherCondition) {
        String token = getAccessToken();

        // Map genre to Spotify seed genres
        String seedGenre = mapGenreToSpotifySeed(genre);

        String url = baseUrl + "/recommendations?seed_genres=" + seedGenre + "&limit=20";

        Map<String, Object> response = webClientBuilder.build()
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + token)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

        if (response == null || !response.containsKey("tracks")) {
            throw new RuntimeException("Failed to fetch Spotify recommendations");
        }

        List<Map<String, Object>> tracks = (List<Map<String, Object>>) response.get("tracks");
        List<MusicRecommendationResponse.Track> trackList = tracks.stream()
                .map(this::mapToTrack)
                .collect(Collectors.toList());

        MusicRecommendationResponse recommendation = new MusicRecommendationResponse();
        recommendation.setGenre(genre);
        recommendation.setWeatherCondition(weatherCondition);
        recommendation.setTracks(trackList);

        return recommendation;
    }

    private String mapGenreToSpotifySeed(String genre) {
        Map<String, String> genreMap = new HashMap<>();
        genreMap.put("chill", "chill");
        genreMap.put("lo-fi", "chill");
        genreMap.put("pop", "pop");
        genreMap.put("dance", "dance");
        genreMap.put("indie", "indie");
        genreMap.put("classical", "classical");
        genreMap.put("intense", "rock");
        genreMap.put("top hits", "pop");

        return genreMap.getOrDefault(genre.toLowerCase(), "pop");
    }

    private MusicRecommendationResponse.Track mapToTrack(Map<String, Object> trackData) {
        MusicRecommendationResponse.Track track = new MusicRecommendationResponse.Track();
        track.setId((String) trackData.get("id"));
        track.setName((String) trackData.get("name"));
        track.setPreviewUrl((String) trackData.get("preview_url"));
        track.setExternalUrl(((Map<String, Object>) trackData.get("external_urls")).get("spotify").toString());

        List<Map<String, Object>> artists = (List<Map<String, Object>>) trackData.get("artists");
        if (artists != null && !artists.isEmpty()) {
            track.setArtist((String) artists.get(0).get("name"));
        }

        Map<String, Object> album = (Map<String, Object>) trackData.get("album");
        if (album != null) {
            track.setAlbum((String) album.get("name"));
            List<Map<String, Object>> images = (List<Map<String, Object>>) album.get("images");
            if (images != null && !images.isEmpty()) {
                track.setImageUrl((String) images.get(0).get("url"));
            }
        }

        return track;
    }
}

