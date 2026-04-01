"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/constants/navigation";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { AuthModal } from "@/components/auth/auth-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const tNav = useTranslations("nav");
  const tAuth = useTranslations("auth");

  const openAuth = (tab: "login" | "register") => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <span className="text-3xl leading-none">🀄</span>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground">学习汉语</span>
            <span className="text-[10px] font-medium leading-tight text-muted-foreground uppercase tracking-wider">Xuexi Hanyu</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <div key={item.key}>
              {item.items ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group h-9 gap-1.5 font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent"
                    >
                      {tNav(item.key)}
                      <ChevronDown className="size-3.5 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className={cn(
                    "p-1.5",
                    item.key === "lessons" ? "w-[280px]" : "w-52"
                  )}>
                    {item.items.map((subItem) => (
                      <DropdownMenuItem key={subItem.key} asChild>
                        <Link
                          href={subItem.href}
                          className="flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2 transition-colors focus:bg-accent focus:text-accent-foreground"
                        >
                          <span className="shrink-0 text-sm font-bold whitespace-nowrap">{tNav(subItem.key)}</span>
                          {subItem.description && (
                            <span className="truncate text-[11px] text-muted-foreground font-medium">
                              {tNav(subItem.description)}
                            </span>
                          )}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" className="h-9 font-medium" asChild>
                  <Link href={item.href}>{tNav(item.key)}</Link>
                </Button>
              )}
            </div>
          ))}
        </nav>

        {/* Auth + Language + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <div className="hidden items-center gap-2 sm:flex">
            <Button variant="ghost" size="sm" className="h-9 px-4 font-semibold" onClick={() => openAuth("login")}>
              {tAuth("login")}
            </Button>
            <Button size="sm" className="h-9 rounded-full px-5 font-bold shadow-md shadow-red-500/20 transition-transform hover:scale-105 active:scale-95" onClick={() => openAuth("register")}>
              {tAuth("register")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-6">
            {NAV_ITEMS.map((item) => (
              <div key={item.key} className="space-y-1">
                {item.items ? (
                  <>
                    <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      {tNav(item.key)}
                    </div>
                    <div className="grid grid-cols-2 gap-1 px-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.key}
                          href={subItem.href}
                          className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {tNav(subItem.key)}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2.5 text-base font-semibold text-foreground transition-colors hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tNav(item.key)}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              <Button variant="outline" className="w-full font-bold" onClick={() => { setMobileMenuOpen(false); openAuth("login"); }}>
                {tAuth("login")}
              </Button>
              <Button className="w-full font-bold" onClick={() => { setMobileMenuOpen(false); openAuth("register"); }}>
                {tAuth("register")}
              </Button>
            </div>
          </nav>
        </div>
      )}

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} defaultTab={authTab} />
    </header>
  );
}
