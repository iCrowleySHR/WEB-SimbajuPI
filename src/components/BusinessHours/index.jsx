import { useUser } from "../../contexts/UserContext";

export default function BusinessHours({ data = [], onSelectDay }) {
  const { user } = useUser();
  const role = user?.role;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col gap-1 mb-5 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Horários de Funcionamento
        </h2>

        {role === "warehouse" && (
          <p className="text-sm text-gray-500">
            Clique em um dia para visualizar ou editar.
          </p>
        )}

        {role === "beneficiary" && (
          <p className="text-sm text-gray-500">
            Veja os dias disponíveis para atendimento.
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
        {data.map(({ id, dayWeek, openTime, closeTime, isActive }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelectDay?.(id)}
            className={`
              group relative flex flex-col items-center justify-center
              rounded-2xl border transition-all duration-200
              hover:shadow-md hover:-translate-y-[2px]
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
              p-4 pt-10
              ${
                isActive
                  ? "bg-green-50 border-green-200 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:bg-white"
              }
            `}
          >
            {/* Badge status */}
            <div
              className={`
                absolute top-3 right-3 px-2 py-0.5 rounded-full text-[11px] font-semibold
                ${
                  isActive
                    ? "bg-green-200 text-green-900"
                    : "bg-gray-200 text-gray-600"
                }
              `}
            >
              {isActive ? "Aberto" : "Fechado"}
            </div>

            <span
              className={`
                text-base font-bold tracking-wide
                ${
                  isActive
                    ? "text-green-800"
                    : "text-gray-800 group-hover:text-gray-900"
                }
              `}
            >
              {dayWeek}
            </span>

            <span
              className={`
                mt-2 text-sm text-center
                ${isActive ? "text-green-700" : "text-gray-500"}
              `}
            >
              {openTime && closeTime ? (
                <>
                  {openTime} <span className="mx-1">—</span> {closeTime}
                </>
              ) : (
                "Sem horário"
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}