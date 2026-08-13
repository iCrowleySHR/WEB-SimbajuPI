import { useNavigate } from "react-router-dom";

export default function ActionButton({
  title,
  description,
  iconClass,
  bgColor = "bg-blue-600",
  hoverColor = "hover:bg-blue-700",
  onClick,
  to,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={description ? `${title}: ${description}` : title}
      className={`
        group relative isolate w-full
        ${bgColor} ${hoverColor}
        text-white
        rounded-xl sm:rounded-2xl
        p-4 sm:p-5 lg:p-6
        min-h-[88px] sm:min-h-[180px]
        text-left

        flex flex-row sm:flex-col
        items-center sm:items-start
        gap-4 sm:gap-4

        shadow-sm sm:shadow-md
        hover:shadow-xl

        transition-[transform,box-shadow,background-color]
        duration-200
        ease-out

        active:scale-[0.98]
        sm:hover:-translate-y-1

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-white
        focus-visible:ring-offset-2
        focus-visible:ring-offset-slate-100

        overflow-hidden
        motion-reduce:transition-none
        motion-reduce:transform-none
      `}
    >
      {/* Decoração */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-gradient-to-br
          from-white/20
          via-transparent
          to-transparent
          opacity-70
          sm:opacity-50
          sm:group-hover:opacity-100
          transition-opacity
          duration-300
          motion-reduce:transition-none
        "
      />

      {/* Ícone */}
      <div
        aria-hidden="true"
        className="
          shrink-0
          flex items-center justify-center
          w-12 h-12
          sm:w-14 sm:h-14
          rounded-xl
          bg-white/15
          backdrop-blur-sm

          transition-transform
          duration-200

          sm:group-hover:scale-105

          motion-reduce:transition-none
          motion-reduce:transform-none
        "
      >
        <i
          className={`${iconClass} text-xl sm:text-2xl`}
        />
      </div>

      {/* Conteúdo */}
      <div className="min-w-0 flex-1">
        <h3
          className="
            text-base
            sm:text-lg
            font-semibold
            tracking-tight
            leading-tight
          "
        >
          {title}
        </h3>

        {description && (
          <p
            className="
              mt-1
              text-sm
              text-white/85
              leading-snug
              line-clamp-2
              sm:line-clamp-3
            "
          >
            {description}
          </p>
        )}
      </div>

      {/* Indicador de ação — aparece apenas no mobile */}
      <span
        aria-hidden="true"
        className="
          shrink-0
          sm:hidden
          text-white/70
          text-lg
        "
      >
        <i className="bi bi-chevron-right" />
      </span>
    </button>
  );
}