const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      
      const data = await response.json();
      setHistory(data.history);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching history:', err);
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
      } else {
        setError('Failed to load analysis history');
        setLoading(false);
      }
    }
  };

  const handleDelete = async (analysisId, event) => {
    // Stop propagation so clicking delete doesn't trigger the row click
    event.stopPropagation();
    
    // Confirm deletion
    if (!window.confirm('Are you sure you want to delete this analysis?')) {
      return;
    }

    setDeletingId(analysisId);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/history/${analysisId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // Remove from local state
        setHistory(history.filter(item => item.id !== analysisId));
      } else {
        alert('Failed to delete analysis');
      }
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete analysis');
    } finally {
      setDeletingId(null);
    }
  };

 const handleViewAnalysis = (analysis) => {
  console.log('Full analysis data:', analysis); // Debug log
  
  // Parse detection_summary and secondary_summary properly
  const detectionSummary = typeof analysis.detection_summary === 'string' 
    ? JSON.parse(analysis.detection_summary) 
    : (analysis.detection_summary || {});
    
  const secondarySummary = typeof analysis.secondary_summary === 'string'
    ? JSON.parse(analysis.secondary_summary)
    : (analysis.secondary_summary || {});
  
  const recommendations = typeof analysis.recommendations === 'string'
    ? JSON.parse(analysis.recommendations)
    : (analysis.recommendations || []);
  
  console.log('Parsed detection_summary:', detectionSummary);
  console.log('Parsed secondary_summary:', secondarySummary);
  
  // Navigate to results page with the analysis data
  navigate('/results', {
    state: {
      analysisData: {
        acne_count: analysis.acne_count,
        skin_score: analysis.score,
        combined_score: analysis.score,
        severity: analysis.severity,
        feedback: analysis.feedback,
        recommendations: recommendations,
        detection_summary: detectionSummary,
        secondary_summary: secondarySummary,
        secondary_analysis_triggered: Object.keys(secondarySummary).length > 0,
        annotated_image_url: analysis.image_path,
        timestamp: analysis.date
      },
      imageUrl: analysis.image_path,
      fromHistory: true
    }
  });
};

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'clear': return 'bg-green-100 text-green-800';
      case 'mild': return 'bg-yellow-100 text-yellow-800';
      case 'moderate': return 'bg-orange-100 text-orange-800';
      case 'severe': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome back, {username}!
        </h1>
        <p className="text-gray-600">
          Track your skin health progress over time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Analyses</h3>
          <p className="text-3xl font-bold text-gray-800">{history.length}</p>
        </div>
        
        {history.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Latest Score</h3>
              <p className="text-3xl font-bold text-green-600">{history[0].score}</p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Current Status</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(history[0].severity)}`}>
                {history[0].severity}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Analysis History</h2>
        </div>
        
        {history.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-600 mb-4">No analysis yet</p>
            <button
              onClick={() => navigate('/analyze')}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Start Your First Analysis
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {history.map((analysis) => (
              <div 
                key={analysis.id} 
                onClick={() => handleViewAnalysis(analysis)}
                className="px-6 py-4 hover:bg-gray-50 transition cursor-pointer relative"
              >
                {/* Delete Button */}
                <button
                  onClick={(e) => handleDelete(analysis.id, e)}
                  disabled={deletingId === analysis.id}
                  className="absolute top-4 right-4 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition disabled:opacity-50 z-10"
                  title="Delete analysis"
                >
                  {deletingId === analysis.id ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>

                <div className="flex items-center justify-between pr-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(analysis.severity)}`}>
                        {analysis.severity}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {formatDate(analysis.date)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Acne Count:</span>
                        <span className="ml-2 font-semibold text-gray-800">{analysis.acne_count}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Skin Score:</span>
                        <span className="ml-2 font-semibold text-gray-800">{analysis.score}/100</span>
                      </div>
                    </div>
                  </div>
                  <svg 
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;