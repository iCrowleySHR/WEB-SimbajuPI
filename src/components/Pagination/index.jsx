export default function Pagination({ 
  currentPage, 
  lastPage, 
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  showPageNumbers = true
}) {
  
  // Função para gerar os números das páginas a serem exibidas
  const getPageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(lastPage, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center mt-8">
      <nav 
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl px-4 py-3 border border-gray-200/50"
        aria-label="Pagination"
      >
        {/* Botão Primeira Página */}
        {showFirstLast && (
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
              bg-gray-50 hover:bg-gray-100 text-gray-700
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:scale-105 active:scale-95
              border border-gray-200"
            aria-label="Primeira página"
          >
            «
          </button>
        )}

        {/* Botão Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            bg-gray-50 hover:bg-gray-100 text-gray-700
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:scale-105 active:scale-95
            border border-gray-200
            flex items-center gap-1"
          aria-label="Página anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        {/* Números das Páginas */}
        {showPageNumbers && (
          <div className="flex items-center gap-1">
            {/* Indicador de páginas anteriores */}
            {pageNumbers[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="hidden sm:flex w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200
                    bg-gray-50 hover:bg-gray-100 text-gray-700
                    hover:scale-105 active:scale-95"
                >
                  1
                </button>
                {pageNumbers[0] > 2 && (
                  <span className="px-2 text-gray-400 hidden sm:block">...</span>
                )}
              </>
            )}

            {/* Números das páginas */}
            {pageNumbers.map(page => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200
                  hover:scale-105 active:scale-95
                  ${currentPage === page
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                  }
                `}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}

            {/* Indicador de páginas seguintes */}
            {pageNumbers[pageNumbers.length - 1] < lastPage && (
              <>
                {pageNumbers[pageNumbers.length - 1] < lastPage - 1 && (
                  <span className="px-2 text-gray-400 hidden sm:block">...</span>
                )}
                <button
                  onClick={() => onPageChange(lastPage)}
                  className="hidden sm:flex w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200
                    bg-gray-50 hover:bg-gray-100 text-gray-700
                    hover:scale-105 active:scale-95"
                >
                  {lastPage}
                </button>
              </>
            )}
          </div>
        )}

        {/* Botão Próxima */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
            bg-gray-50 hover:bg-gray-100 text-gray-700
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:scale-105 active:scale-95
            border border-gray-200
            flex items-center gap-1"
          aria-label="Próxima página"
        >
          Próxima
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Botão Última Página */}
        {showFirstLast && (
          <button
            onClick={() => onPageChange(lastPage)}
            disabled={currentPage === lastPage}
            className="px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
              bg-gray-50 hover:bg-gray-100 text-gray-700
              disabled:opacity-40 disabled:cursor-not-allowed
              hover:scale-105 active:scale-95
              border border-gray-200"
            aria-label="Última página"
          >
            »
          </button>
        )}

        {/* Indicador de total de páginas (mobile) */}
        <div className="ml-2 px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 sm:hidden">
          {currentPage} / {lastPage}
        </div>
      </nav>
    </div>
  );
}