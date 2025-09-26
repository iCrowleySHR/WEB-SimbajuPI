export default function UserProfileCard({ icon, title, description, borderColor, textColor }) {
  return (
    <div className={`text-center p-6 border-2 ${borderColor} rounded-xl hover:${borderColor.replace('border', 'border')} transition-colors`}>
      <i className={`${icon} text-4xl ${textColor} mb-4`}></i>
      <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
