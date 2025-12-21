import { useState, useEffect } from 'react'
import axios from 'axios'

const HistoryPanel = () => {
  const [searchHistory, setSearchHistory] = useState([])
  const [recommendationHistory, setRecommendationHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('searches')

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const [searches, recommendations] = await Promise.all([
        axios.get('/api/history/searches'),
        axios.get('/api/history/recommendations')
      ])
      setSearchHistory(searches.data)
      setRecommendationHistory(recommendations.data)
    } catch (error) {
      console.error('Failed to fetch history:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className="card">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    )
  }

  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">History</h2>
      
      <div className="flex gap-2 mb-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('searches')}
          className={`pb-2 px-4 font-semibold transition-colors ${
            activeTab === 'searches'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Searches ({searchHistory.length})
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`pb-2 px-4 font-semibold transition-colors ${
            activeTab === 'recommendations'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Recommendations ({recommendationHistory.length})
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2">
        {activeTab === 'searches' ? (
          searchHistory.length > 0 ? (
            searchHistory.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{item.city}</p>
                    <p className="text-sm text-gray-400">{item.countryCode}</p>
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(item.searchedAt)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No search history yet</p>
          )
        ) : (
          recommendationHistory.length > 0 ? (
            recommendationHistory.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{item.city}</p>
                    <p className="text-sm text-gray-400 capitalize">
                      {item.weatherCondition} • {item.musicGenre}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(item.recommendedAt)}</p>
                </div>
                {item.temperature && (
                  <p className="text-xs text-gray-500">
                    {Math.round(item.temperature)}°C
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No recommendation history yet</p>
          )
        )}
      </div>
    </div>
  )
}

export default HistoryPanel

