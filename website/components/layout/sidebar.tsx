"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/constants/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-muted/50 lg:block">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {tNav(item.key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
