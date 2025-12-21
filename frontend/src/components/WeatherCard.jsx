const WeatherCard = ({ weather }) => {
  const getWeatherIcon = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const getWeatherEmoji = (condition) => {
    const emojiMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    }
    return emojiMap[condition] || '🌤️'
  }

  return (
    <div className="card animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">{weather.city}</h2>
          <p className="text-gray-400">{weather.country}</p>
        </div>
        <div className="text-6xl">{getWeatherEmoji(weather.condition)}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-700/30 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Temperature</p>
          <p className="text-3xl font-bold">{Math.round(weather.temperature)}°C</p>
        </div>
        <div className="bg-gray-700/30 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-1">Feels Like</p>
          <p className="text-3xl font-bold">{Math.round(weather.feelsLike)}°C</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
        <p className="text-sm text-gray-300 mb-1">Condition</p>
        <p className="text-xl font-semibold capitalize">{weather.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center">
          <p className="text-sm text-gray-400">Humidity</p>
          <p className="text-lg font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Wind Speed</p>
          <p className="text-lg font-semibold">{weather.windSpeed.toFixed(1)} m/s</p>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

