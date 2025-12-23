import FeatureCard from "../components/FeatureCard"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-20">
                <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
                    {/* Left-side - Text Content*/}
                    <div className="space-y-5 md:space-y-6">
                         {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                            <span className="text-lg">✨</span>
                            <span className="text-green-800 text-sm font-medium">AI-Powered Analysis</span>
                        </div>
                        
                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Discover Your Skin's True Potential 
                        </h1>
                        
                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                            Upload a photo or use your webcam to get personalized skincare insights powered by advanced AI analysis.
                            Understand your skin better and get actionable recommendations.
                        </p>
                        
                        {/* Upload Card - Shows here on mobile, hidden on desktop */}
                        <div className="md:hidden flex justify-center">
                            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6">
                                {/* Upload Icon Area */}
                                <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                    <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                {/* Placeholder Lines */}
                                <div className="space-y-4">
                                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4"></div>
                                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2"></div>
                                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button 
                                onClick={() => navigate('/analyze')}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg font-medium hover:bg-green-900 transition shadow-md w-full sm:w-auto"
                            >
                                <svg 
                                    className="w-5 h-5"
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
                                Start Analysis
                            </button>
                            <a 
                                href="#how-it-works" 
                                className="px-6 py-3 text-gray-700 font-medium hover:text-gray-900 transition text-center border-2 border-gray-200 rounded-lg hover:border-gray-300 sm:border-0"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                    
                    {/* Right-side - Upload Card (Desktop only) */}
                    <div className="hidden md:flex justify-center">
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 md:p-8">
                            {/* Upload Icon Area */}
                            <div className="aspect-video bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-14 h-14 md:w-16 md:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            {/* Placeholder Lines */}
                            <div className="space-y-4">
                                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
                {/* Section Header */}
                <div id="how-it-works" className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                        Simple steps to beautiful skin insights
                    </p>
                </div>
                
                {/* 3 Cards Grid */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    <FeatureCard
                        number="1"
                        title="Upload or Capture"
                        description="Upload a photo from your device or use your webcam to capture a fresh image of your face."
                    />
                    <FeatureCard
                        number="2"
                        title="AI Analysis"
                        description="Our advanced AI analyzes your skin to detect concerns, texture, and overall health metrics."
                    />
                    <FeatureCard
                        number="3"
                        title="Get Insights"
                        description="Receive personalized recommendations and a detailed breakdown of your skin's condition."
                    />
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
                <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-10 md:p-12 text-center shadow-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Transform Your Skin?
                    </h2>  
                    <p className="text-base md:text-lg text-green-100 mb-8 max-w-2xl mx-auto">
                        Get started with a free analysis today! No sign-up required.
                    </p>
                    <button 
                        onClick={() => navigate('/analyze')}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-800 rounded-lg font-medium hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
                    >
                        Begin Analysis
                        <span>→</span>
                    </button>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="py-8 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <p className="text-sm md:text-base text-gray-600">
                        © 2025 SkinAnalyze. Advanced skincare intelligence at your fingertips.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Home                     