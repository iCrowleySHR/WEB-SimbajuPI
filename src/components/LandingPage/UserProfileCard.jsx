  export default function UserProfileCard({ icon, title, description, borderColor, textColor }) {
    return (
      <div className={`text-center p-7 bg-white rounded-2xl border-t-4 ${borderColor} shadow-md hover:shadow-2xl transition-all duration-400 transform hover:scale-[1.02]`}>
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
          <i className={`${icon} text-3xl ${textColor}`}></i>
        </div>
        <h3 className="font-bold text-gray-800 text-xl mb-4">{title}</h3>
        <p className="text-gray-600 leading-7 text-[15px]">{description}</p>
      </div>
    );
  }