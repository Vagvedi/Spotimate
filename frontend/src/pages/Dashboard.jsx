import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import WeatherCard from '../components/WeatherCard'
import MusicRecommendations from '../components/MusicRecommendations'
import HistoryPanel from '../components/HistoryPanel'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showHistory, setShowHistory] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!city.trim()) return

    setLoading(true)
    setError('')
    setWeather(null)
    setRecommendations(null)

    try {
      const response = await axios.get(`/api/recommendations/city?city=${encodeURIComponent(city)}`)
      setWeather(response.data.weather)
      setRecommendations(response.data.recommendations)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather and recommendations')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Climatic Beats
          </h1>
          <p className="text-gray-400">
            Welcome back, {user?.firstName || 'User'}! 🎵
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="btn-secondary"
          >
            {showHistory ? 'Hide' : 'Show'} History
          </button>
          <button onClick={logout} className="btn-secondary">
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Form */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Search City</h2>
            <form onSubmit={handleSearch} className="flex gap-3">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-field flex-1"
                placeholder="Enter city name (e.g., London, New York, Tokyo)"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary whitespace-nowrap"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Weather Card */}
          {weather && <WeatherCard weather={weather} />}

          {/* Music Recommendations */}
          {recommendations && (
            <MusicRecommendations recommendations={recommendations} />
          )}

          {/* Empty State */}
          {!weather && !loading && (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">🌤️</div>
              <h3 className="text-xl font-semibold mb-2">Discover Music by Weather</h3>
              <p className="text-gray-400">
                Search for a city to see weather-based music recommendations
              </p>
            </div>
          )}
        </div>

        {/* History Sidebar */}
        <div className="lg:col-span-1">
          {showHistory && <HistoryPanel />}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

