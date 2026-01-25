export class MusicRecommendationResponseDto {
  genre: string;
  weatherCondition: string;
  tracks: Track[];
}

export class Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  previewUrl: string;
  externalUrl: string;
  imageUrl: string;
}
