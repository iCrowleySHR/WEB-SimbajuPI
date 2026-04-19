import formatDate from '../../utils/formatDate';
import translate from '../../utils/translate';

export default function UserInfo({ user }) {
  const fields = [
    { label: "Email", value: user?.email, icon: "fas fa-envelope" },
    { label: "Perfil", value: translate(user?.role), icon: "fas fa-shield-alt" },
    { label: "Criado em", value: formatDate(user?.created_at), icon: "fas fa-calendar-plus" },
    { label: "Última atualização", value: formatDate(user?.updated_at), icon: "fas fa-clock" },
  ];

  const initials = user?.name
    ?.split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
      
      {/* Avatar + nome */}
      <div className="flex items-center gap-4 pb-4 mb-6 border-b border-gray-100">
        <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-base font-semibold flex-shrink-0">
          {initials || <i className="fas fa-user text-lg" />}
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-900 leading-tight">
            {user?.name}
          </p>
          <p className="text-sm text-gray-400 mt-0.5">
            Informações do usuário
          </p>
        </div>
      </div>

      {/* Campos em grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/40 hover:bg-gray-50 transition"
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
              <i className={`${field.icon} text-sm text-gray-500`} />
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                {field.label}
              </span>

              <span className="text-sm text-gray-800 font-semibold mt-1 break-all">
                {field.value || "-"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}