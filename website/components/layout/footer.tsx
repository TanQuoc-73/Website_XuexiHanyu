"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const footerLinks = {
    learn: [
      { label: tNav("lessons"), href: "/lessons" as const },
      { label: tNav("vocabulary"), href: "/vocabulary" as const },
      { label: tNav("grammar"), href: "/grammar" as const },
      { label: tNav("practice"), href: "/practice" as const },
    ],
    tools: [
      { label: tNav("dictionary"), href: "/dictionary" as const },
      { label: tFooter("writingPractice"), href: "/practice/writing" as const },
      { label: tFooter("listeningPractice"), href: "/practice/listening" as const },
      { label: tFooter("flashcard"), href: "/practice/flashcard" as const },
    ],
    about: [
      { label: tFooter("about"), href: "/about" as const },
      { label: tFooter("contact"), href: "/contact" as const },
      { label: tFooter("terms"), href: "/terms" as const },
    ],
  };

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-3xl leading-none">🀄</span>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-foreground">学习汉语</span>
                <span className="text-[10px] font-medium leading-tight text-muted-foreground">Xuexi Hanyu</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {tFooter("description")}
            </p>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{tFooter("learning")}</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{tFooter("tools")}</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">{tFooter("other")}</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">{tFooter("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
