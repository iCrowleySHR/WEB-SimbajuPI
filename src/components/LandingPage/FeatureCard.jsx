export default function FeatureCard({ icon, title, description, bgColor, iconBg }) {
  return (
    <div className={`text-center p-6 rounded-xl ${bgColor} hover:opacity-90 transition-colors`}>
      <div className={`${iconBg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
        <i className={`${icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
