export default function ContainerActionButton({ children }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-3
        sm:gap-4
        lg:gap-6
        mb-6
        sm:mb-8
        lg:mb-10
      "
    >
      {children}
    </div>
  );
}