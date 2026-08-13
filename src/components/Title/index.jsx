import BackPage from "../BackPage";

export default function Title({
  title,
  subtitle,
  back = false,
  backTo = null,
  backLabel = "Voltar",
}) {
  if (!title && !subtitle) return null;

  return (
    <section
      className="
        relative

        mb-6
        sm:mb-7
        lg:mb-8

        pb-4
        sm:pb-5

        border-b
        border-gray-100
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:gap-6
        "
      >
        {/* Conteúdo */}
        <div className="min-w-0">
          {title && (
            <h1
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl

                font-bold
                tracking-tight

                text-gray-800

                leading-tight

                break-words
              "
            >
              {title}
            </h1>
          )}

          {subtitle && (
            <p
              className="
                mt-1.5
                sm:mt-2

                text-sm
                sm:text-base

                text-gray-500

                leading-relaxed

                max-w-3xl
              "
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Voltar */}
        {back && (
          <div
            className="
              shrink-0

              self-start
              sm:self-auto
            "
          >
            <BackPage
              to={backTo}
              label={backLabel}
            />
          </div>
        )}
      </div>
    </section>
  );
}