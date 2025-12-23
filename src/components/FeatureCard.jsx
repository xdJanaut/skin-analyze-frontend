function FeatureCard({ number, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <span className="text-3xl font-bold text-green-700">{number}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard