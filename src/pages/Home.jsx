import FeatureCard from "../components/Featurecard"
import { useNavigate } from "react-router-dom"
function Home() {
    const navigate = useNavigate();
    return (
        <div className = "min-h-screen">
            <div className = "max-w-7xl mx-auto px-8 py-20">
                <div className = "grid md: grid-cols-2 gap-12 items-center">
                    {/* Left-side - Text Content*/}
                    <div className= "space-y-6">
                         {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
                        <span className="text-lg">✨</span>
                        <span className="text-green-800 text-sm font-medium">AI-Powered Analysis</span>
                        </div>
                        {/* Headline */}
                        <h1 className= "text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Discover Your Skin's True Potential 
                        </h1>
                        {/* Description */}
                        <p className = "text-lg text-gray-600 leading-relaxed">
                            Upload a photo or use your webcam to get personalized skincare insights powered by advanced AI analysis.
                            Understand your skin better and get actionable recommendations.
                        </p>
                        {/* Buttons*/}
                        <div className= "flex gap-4 pt-4">
                            <button 
                                 onClick= {() => navigate('/analyze')}
                                 className= "flex items-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg font-medium hover:bg-green-900 transition">
                                    <svg 
                                        className= "w-5 h-5"
                                        fill = "none"
                                        stroke = "currentColor"
                                        viewBox = "0 0 24 24"
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
                            <a href="#how-it-works" className= "px-6 py-3 text-gray-700 font medium hover:text-gray-900 transition">
                                Learn More
                            </a>
                        </div>
                    </div>
                    {/* Right-side - Upload Card */}
                    <div className= "flex justify-center">
                        <div className= "w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
                            {/* Upload Icon Area*/}
                            <div className= "aspect-video bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                                <svg className= "w-16 h-16 text-gray-400" fill= "none" stroke= "currentColor" viewBox= "0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            {/* Placeholder Lines */}
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className= "max-w-7xl mx-auto px-8 py-20">
                {/* Section Header */}
                <div id= "how-it-works" className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Simple steps to beautiful skin insights
                    </p>
                </div>
                {/* 3 Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
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
            <div className= "max-w-7xl mx-auto px-8 py-20">
                <div className= "bg-green-800 rounded-3xl p-12 text-center">
                    <h2 className= "text-4xl font-bold text-white mb-4">Ready to Transform Your Skin?</h2>  
                    <p className= "text-lg text-green-100 mb-8">Get started with a free analysis today! No sign-up required.</p>
                    <button 
                        onClick= {() => navigate('/analyze')}
                        className= "inline-flex items-center gap-2 px-8 py-4 bg-white text-green-800 rounded-lg font-medium hover:bg-gray-100 transition">
                            Begin Analysis
                            <span>→</span>
                    </button>
                </div>
            </div>
            {/* Footer Section */}
            <footer className= "py-8">
                <div className= "max-w-7xl mx-auto px-8 text-center">
                    <p className= "text-gray-600"> @ 2025 SkinAnalyze. Advanced skincare intelligence at your fingertips.</p>
                </div>
            </footer>
        </div>

    )
}

export default Home