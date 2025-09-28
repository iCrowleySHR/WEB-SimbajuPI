
export default function BeneficiaryStatusCard({ status, nextPickup, quantity, unit }) {
  const statusColors = {
    ativo: "bg-green-100 text-green-800",
    inativo: "bg-red-100 text-red-800",
    pendente: "bg-yellow-100 text-yellow-800",
  };

  const colorClass = statusColors[status.toLowerCase()] || "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Status do Benefício
          </h3>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${colorClass}`}>
              {status.toLowerCase() === "ativo" &&  <i class="fas fa-check-circle mr-1"></i>}
              {status}
            </span>
            <span className="ml-4 text-gray-600">
              Próxima retirada: {nextPickup}
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{quantity}</p>
          <p className="text-sm text-gray-600">{unit}</p>
        </div>
      </div>
    </div>
  );
}
