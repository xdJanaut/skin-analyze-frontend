import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeImage } from '../services/api';

function Analyze() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Handle file selection from upload
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle analyze button click
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      console.log('Calling API with file:', selectedFile.name);
      
      // Call backend API
      const analysisData = await analyzeImage(selectedFile);
      
      console.log('Analysis successful:', analysisData);
      
      // Navigate to results page with data
      navigate('/results', {
        state: {
          analysisData,
          imageUrl: imagePreview
        }
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle camera capture (simplified for now)
  const handleCameraClick = () => {
    setError('Camera feature coming soon! Please use "Upload Photo" for now.');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-20">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analyze Your Skin
          </h1>
          <p className="text-lg text-gray-700">
            Upload a photo to get personalized skin analysis and recommendations
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Image Preview (if selected) */}
        {imagePreview && (
          <div className="mb-8 bg-white rounded-3xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Preview
            </h3>
            <div className="flex justify-center mb-4">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-96 rounded-lg shadow-md"
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze My Skin'
                )}
              </button>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setImagePreview(null);
                }}
                className="px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition border border-gray-300"
              >
                Choose Different Photo
              </button>
            </div>
          </div>
        )}

        {/* Upload Card (only show if no image selected) */}
        {!imagePreview && (
          <div className="bg-white rounded-3xl shadow-lg p-12 border-2 border-dashed border-gray-300">
            <div className="flex justify-center gap-8 mb-8">
              {/* Upload Icon */}
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              {/* Camera Icon */}
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Method Title */}
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Choose your method
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8">
               Make sure the photo is taken in good lighting and clearly shows your face.
            </p>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Action Buttons */}
            <div className="flex justify-center">
              <button 
                onClick={handleUploadClick}
                className="flex gap-2 px-16 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-900 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Photo
              </button>
              <button 
                onClick={handleCameraClick}
                className="flex gap-2 px-16 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition border border-gray-300 ml-6"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Use Camera
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analyze;