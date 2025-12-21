const MusicRecommendations = ({ recommendations }) => {
  const getGenreEmoji = (genre) => {
    const emojiMap = {
      'chill': '😌',
      'lo-fi': '🎧',
      'pop': '🎵',
      'dance': '💃',
      'indie': '🎸',
      'classical': '🎼',
      'intense': '🔥',
      'top hits': '⭐'
    }
    return emojiMap[genre.toLowerCase()] || '🎵'
  }

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{getGenreEmoji(recommendations.genre)}</span>
        <div>
          <h2 className="text-2xl font-bold">Music Recommendations</h2>
          <p className="text-gray-400">
            {recommendations.genre} for {recommendations.weatherCondition.toLowerCase()} weather
          </p>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {recommendations.tracks.map((track, index) => (
          <div
            key={track.id}
            className="bg-gray-700/30 rounded-xl p-4 hover:bg-gray-700/50 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex gap-4">
              {track.imageUrl && (
                <img
                  src={track.imageUrl}
                  alt={track.album}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{track.name}</h3>
                <p className="text-gray-400 text-sm truncate">{track.artist}</p>
                <p className="text-gray-500 text-xs truncate">{track.album}</p>
                <div className="flex gap-2 mt-2">
                  {track.previewUrl && (
                    <audio controls className="h-8 flex-1">
                      <source src={track.previewUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {track.externalUrl && (
                    <a
                      href={track.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-xs py-1 px-3"
                    >
                      Open in Spotify
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicRecommendations

