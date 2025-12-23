import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeImage } from '../services/api';

function Analyze() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
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

  // Start camera
  const handleCameraClick = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      
      // Wait for video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      console.error('Camera error:', err);
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  };

  // Capture photo from camera
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current video frame to canvas
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob and create file
    canvas.toBlob((blob) => {
      const file = new File([blob], `camera-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      
      // Create preview from canvas
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImagePreview(dataUrl);
      
      // Stop camera and hide
      stopCamera();
    }, 'image/jpeg', 0.95);
  };

  // Stop camera and close
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-20">
        {/* Page Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Analyze Your Skin
          </h1>
          <p className="text-base md:text-lg text-gray-700 px-4">
            Upload a photo to get personalized skin analysis and recommendations
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center text-sm md:text-base">
            {error}
          </div>
        )}

        {/* Camera View */}
        {showCamera && (
          <div className="mb-8 bg-white rounded-3xl shadow-lg p-4 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 text-center">
              Position Your Face
            </h3>
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mt-6">
              <button
                onClick={handleCapture}
                className="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                📸 Capture Photo
              </button>
              <button
                onClick={stopCamera}
                className="w-full md:w-auto px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition border border-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Image Preview (if selected) */}
        {imagePreview && !showCamera && (
          <div className="mb-8 bg-white rounded-3xl shadow-lg p-4 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 text-center">
              Preview
            </h3>
            <div className="flex justify-center mb-4">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-64 md:max-h-96 rounded-lg shadow-md w-full object-contain"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full md:w-auto px-6 md:px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
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
                className="w-full md:w-auto px-6 md:px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition border border-gray-300"
              >
                Choose Different Photo
              </button>
            </div>
          </div>
        )}

        {/* Upload Card (only show if no image selected and camera not active) */}
        {!imagePreview && !showCamera && (
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-12 border-2 border-dashed border-gray-300">
            <div className="flex justify-center gap-6 md:gap-8 mb-6 md:mb-8">
              {/* Upload Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-400"
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
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-gray-400"
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
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-3 md:mb-4">
              Choose your method
            </h2>
            <p className="text-base md:text-lg text-gray-700 text-center mb-6 md:mb-8 px-2">
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

            {/* Action Buttons - Stack on mobile, side-by-side on desktop */}
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
              <button 
                onClick={handleUploadClick}
                className="flex items-center justify-center gap-2 px-8 md:px-16 py-3 md:py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-900 transition w-full md:w-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Photo
              </button>
              <button 
                onClick={handleCameraClick}
                className="flex items-center justify-center gap-2 px-8 md:px-16 py-3 md:py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition border border-gray-300 w-full md:w-auto"
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