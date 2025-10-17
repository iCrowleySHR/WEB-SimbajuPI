export default function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-50  flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner azul elegante */}
        <div className="relative">
          <div className="w-12 h-12 border-3 border-blue-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-3 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Texto minimalista */}
        <p className="text-blue-600 font-medium text-sm tracking-wide">CARREGANDO</p>
        
        {/* Linha sutil */}
        <div className="w-16 h-px bg-blue-200"></div>
      </div>
    </div>
  );
}