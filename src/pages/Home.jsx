import FeatureCard from "../components/FeatureCard"
import { useNavigate } from "react-router-dom"

function Home() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-20">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left-side - Text Content*/}
                    <div className="space-y-4 md:space-y-6">
                         {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-green-100 rounded-full">
                            <span className="text-base md:text-lg">✨</span>
                            <span className="text-green-800 text-xs md:text-sm font-medium">AI-Powered Analysis</span>
                        </div>
                        
                        {/* Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                            Discover Your Skin's True Potential 
                        </h1>
                        
                        {/* Description */}
                        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                            Upload a photo or use your webcam to get personalized skincare insights powered by advanced AI analysis.
                        </p>
                        
                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                            <button 
                                onClick={() => navigate('/analyze')}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg font-medium hover:bg-green-900 transition w-full sm:w-auto"
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
                                className="px-6 py-3 text-gray-700 font-medium hover:text-gray-900 transition text-center sm:text-left"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                    
                    {/* Right-side - Upload Card - Hidden on small mobile */}
                    <div className="hidden sm:flex justify-center">
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 md:p-8">
                            {/* Upload Icon Area */}
                            <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            {/* Placeholder Lines */}
                            <div className="space-y-3 md:space-y-4">
                                <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 md:h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-3 md:h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                {/* Section Header */}
                <div id="how-it-works" className="text-center mb-10 md:mb-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                        How It Works
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
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
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                <div className="bg-green-800 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                        Ready to Transform Your Skin?
                    </h2>  
                    <p className="text-base md:text-lg text-green-100 mb-6 md:mb-8 px-4">
                        Get started with a free analysis today!
                    </p>
                    <button 
                        onClick={() => navigate('/analyze')}
                        className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white text-green-800 rounded-lg font-medium hover:bg-gray-100 transition"
                    >
                        Begin Analysis
                        <span>→</span>
                    </button>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="py-6 md:py-8">
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