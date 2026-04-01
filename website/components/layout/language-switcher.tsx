"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { ChevronDown, Check } from "lucide-react";
import VN from "country-flag-icons/react/3x2/VN";
import US from "country-flag-icons/react/3x2/US";
import CN from "country-flag-icons/react/3x2/CN";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const locales = [
  { code: "vi" as const, Flag: VN },
  { code: "en" as const, Flag: US },
  { code: "zh" as const, Flag: CN },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");

  function onChange(nextLocale: "vi" | "en" | "zh") {
    router.replace(pathname, { locale: nextLocale });
  }

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-auto gap-2 px-2 text-muted-foreground hover:text-foreground"
        >
          <current.Flag className="size-4 rounded-sm" />
          <span className="hidden text-xs font-bold sm:inline">
            {locale.toUpperCase()}
          </span>
          <ChevronDown className="size-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => onChange(l.code)}
            className="flex cursor-pointer items-center gap-2 rounded-sm"
          >
            <l.Flag className="size-4 rounded-sm shrink-0" />
            <span className="flex-1">{t(l.code)}</span>
            {l.code === locale && <Check className="size-3.5 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
