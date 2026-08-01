"use client";

import { Download, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";

import { links, navItems } from "@/data/dev-content";
import { useHeaderScroll } from "@/hooks/use-header-scroll";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const { isScrolled, isHidden } = useHeaderScroll();
  const { isOpen, toggle, close } = useMobileMenu();

  const scrollTo = (href: string) => {
    close();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 transition-transform duration-300 lg:px-6",
          isHidden && "header-hidden",
        )}
        role="banner"
      >
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border px-2 py-1.5 shadow-lg backdrop-blur-md transition-all duration-300 sm:px-3 sm:py-2",
            isScrolled
              ? "border-dev/20 bg-dev-bg/95"
              : "border-white/10 bg-dev-bg/80",
          )}
        >
          <button
            type="button"
            onClick={() => scrollTo("#hero")}
            className="group flex items-center gap-2.5 rounded-full pl-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dev"
            aria-label="Inicio"
          >
            <span className="h-9 w-9 overflow-hidden rounded-lg border border-dev/40 bg-white shadow-sm transition-transform duration-200 group-hover:scale-110">
              <img
                src="/assets/brand/logo-light.png"
                alt="Logo Maiawall"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-sm font-bold text-white transition-colors group-hover:text-dev-light">
              Maiawall
            </span>
          </button>

          <nav className="hidden lg:block" aria-label="Menu principal">
            <ul className="flex items-center gap-5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.href)}
                    className="relative text-sm font-semibold text-gray-300 transition-colors duration-200 after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-dev after:transition-all after:duration-300 hover:text-dev-light hover:after:w-full"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 pr-1 lg:flex">
            <Link
              href={links.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm font-semibold text-gray-300 transition-all duration-200 hover:border-dev-light hover:text-dev-light"
            >
              <Download className="h-4 w-4" />
              Baixar CV
            </Link>
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-full bg-dev px-5 py-1.5 text-sm font-bold text-white shadow-dev transition-all duration-200 hover:-translate-y-0.5 hover:bg-dev-dark"
            >
              <MessageCircle className="h-4 w-4" />
              Fale comigo
            </button>
          </div>

          <button
            type="button"
            className="rounded-full p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-expanded={isOpen}
            aria-label="Menu"
            onClick={toggle}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <button
        type="button"
        aria-label="Fechar menu"
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 bg-black/55 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <nav
        aria-label="Menu mobile"
        className={cn(
          "fixed right-0 top-0 z-[60] flex h-full w-72 flex-col border-l border-white/10 bg-dev-bg text-white transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 overflow-hidden rounded-lg border border-dev/40 bg-white">
              <img
                src="/assets/brand/logo-light.png"
                alt="Logo Maiawall"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="text-sm font-bold leading-tight">
              Maiawall
              <br />
              Wallace Maia
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                type="button"
                onClick={() => scrollTo(item.href)}
                className="flex w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-white/85 transition-all duration-200 hover:bg-dev/10 hover:text-white"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 border-t border-white/10 p-5">
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="flex w-full items-center justify-center rounded-xl bg-dev px-5 py-3 text-sm font-bold text-white transition-all active:scale-[0.98]"
          >
            Fale comigo
          </button>
          <Link
            href={links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            Baixar CV
          </Link>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["GitHub", links.github],
              ["LinkedIn", links.linkedin],
              ["WhatsApp", links.whatsapp],
              ["Instagram", links.instagram],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-center text-xs font-semibold text-white/90 transition-colors hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
