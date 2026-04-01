import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Section({ children, title, subtitle, className = "" }: SectionProps) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-8 text-center sm:mb-12">
          {title && <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">{title}</h2>}
          {subtitle && <p className="mt-2 text-base text-zinc-500 sm:text-lg">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
