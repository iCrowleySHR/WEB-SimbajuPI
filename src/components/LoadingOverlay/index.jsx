export default function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-blue-50/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-5">
        {/* Spinner circular azul gradiente */}
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute top-1 left-1 w-12 h-12 border-3 border-transparent border-t-white border-r-white rounded-full animate-spin"></div>
        </div>
        
        {/* Texto com efeito de onda */}
        <div className="flex space-x-1">
          <span className="text-blue-700 font-light text-sm tracking-wider opacity-0 animate-wave" style={{ animationDelay: '0ms' }}>L</span>
          <span className="text-blue-700 font-light text-sm tracking-wider opacity-0 animate-wave" style={{ animationDelay: '100ms' }}>O</span>
          <span className="text-blue-700 font-light text-sm tracking-wider opacity-0 animate-wave" style={{ animationDelay: '200ms' }}>A</span>
          <span className="text-blue-700 font-light text-sm tracking-wider opacity-0 animate-wave" style={{ animationDelay: '300ms' }}>D</span>
          <span className="text-blue-700 font-light text-sm tracking-wider opacity-0 animate-wave" style={{ animationDelay: '400ms' }}>I</span>
          <span className="text-blue-700 font-light text-sm tracking-wider opacity-0 animate-wave" style={{ animationDelay: '500ms' }}>N</span>
          <span className="text-blue-700 font-light text-sm tracking-wider opacity-0 animate-wave" style={{ animationDelay: '600ms' }}>G</span>
        </div>
      </div>
    </div>
  );
}
