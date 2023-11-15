export default function Container({
  children,
  className = null
}: {
  children: React.ReactNode,
  className?: string | null;
}) {
  return (
    <div className={`container${className ? ` ${className}` : '' }`}>
      {children}
    </div>
  )
}
