import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisData, imageUrl } = location.state || {};

  // If no data, redirect back to home
  if (!analysisData) {
    navigate('/');
    return null;
  }

  // Use combined_score if available, otherwise fall back to skin_score
  const displayScore = analysisData.combined_score ?? analysisData.skin_score;

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-lime-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getScoreBackground = (score) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-lime-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-orange-100';
  };

  const getConditionDescription = (type) => {
    const descriptions = {
      'Pimples': 'Inflamed, raised bumps on the skin',
      'Acne': 'General inflammatory acne',
      'acne': 'General inflammatory acne',
      'blackhead': 'Open comedones with oxidized sebum',
      'whitehead': 'Closed comedones under the skin',
      'cystic': 'Deep, painful acne lesions',
      'acne_scars': 'Post-inflammatory marks or indentations',
      'papular': 'Small, raised, red bumps',
      'purulent': 'Pus-filled inflammatory lesions',
      'conglobata': 'Severe form of acne with interconnected lesions',
      'folliculitis': 'Inflamed hair follicles',
      'milium': 'Small, white bumps (keratin cysts)',
      'keloid': 'Raised scar tissue',
      'flat_wart': 'Flat, smooth growths',
      'syringoma': 'Small, benign sweat duct tumors',
      'crystalline': 'Clear, fluid-filled bumps',
      'sebo-crystan-conglo': 'Complex sebaceous condition',
      'melasma': 'Brown or gray-brown patches of hyperpigmentation',
      'Melasma': 'Brown or gray-brown patches of hyperpigmentation',
      'rosacea': 'Redness and visible blood vessels',
      'Rosacea': 'Redness and visible blood vessels'
    };
    return descriptions[type] || 'Detected skin condition';
  };

  // Merge all detections from both models
  const allDetections = {};
  
  // Add primary detections
  if (analysisData.detection_summary) {
    Object.entries(analysisData.detection_summary).forEach(([type, count]) => {
      allDetections[type] = (allDetections[type] || 0) + count;
    });
  }
  
  // Add secondary detections
  if (analysisData.secondary_summary) {
    Object.entries(analysisData.secondary_summary).forEach(([type, count]) => {
      allDetections[type] = (allDetections[type] || 0) + count;
    });
  }

  const hasAnyDetections = Object.keys(allDetections).length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SkinAnalyze</h1>
            <p className="text-gray-600 mt-1">
              Personalized insights and recommendations for your skincare routine
            </p>
          </div>
          <button
            onClick={() => navigate('/analyze')}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            ← New Analysis
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Annotated Image */}
          <div className="space-y-6">
            {analysisData.annotated_image_url ? (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Analysis Results
                </h3>
                <img 
                  src={`${API_BASE_URL}${analysisData.annotated_image_url}`}
                  alt="Detected skin conditions" 
                  className="w-full rounded-xl"
                />
                <p className="text-sm text-gray-500 mt-3 text-center">
                  Colored boxes show detected skin conditions with confidence scores
                </p>
              </div>
            ) : imageUrl ? (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Your Photo
                </h3>
                <img 
                  src={imageUrl} 
                  alt="Uploaded photo" 
                  className="w-full rounded-xl"
                />
              </div>
            ) : null}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Skin Health Score - Main Card */}
            <div className={`${getScoreBackground(displayScore)} rounded-2xl shadow-md p-8`}>
              <h2 className="text-gray-700 font-semibold mb-4 uppercase text-sm tracking-wide">
                Overall Skin Health
              </h2>
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className={`text-6xl font-bold ${getScoreColor(displayScore)}`}>
                    {displayScore}
                  </div>
                  <div className="text-gray-600 text-lg mt-1">out of 100</div>
                </div>
                
                {/* Circular Progress */}
                <div className="relative w-24 h-24">
                  <svg className="transform -rotate-90 w-24 h-24">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-300"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - displayScore / 100)}`}
                      className={getScoreColor(displayScore)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getScoreColor(displayScore)}`}>
                    {displayScore}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${getScoreColor(displayScore)} bg-current`}
                  style={{ width: `${displayScore}%` }}
                ></div>
              </div>
            </div>

            {/* Detected Concerns - Merged */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Detected Skin Conditions
              </h2>
              
              {hasAnyDetections ? (
                <div className="space-y-3">
                  {Object.entries(allDetections)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, count]) => (
                      <div key={type} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                          {count}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-blue-900 capitalize">
                            {type.replace(/_/g, ' ')}
                          </div>
                          <div className="text-sm text-blue-700 mt-1">
                            {getConditionDescription(type)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-green-600">
                  <svg className="w-16 h-16 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="font-semibold text-lg">No skin concerns detected!</p>
                  <p className="text-sm text-gray-600 mt-1">Your skin looks healthy</p>
                </div>
              )}
            </div>

            {/* Feedback */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Analysis
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {analysisData.feedback}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations - Full Width */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recommended Steps
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(analysisData.recommendations || []).map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="text-gray-700 pt-1">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;