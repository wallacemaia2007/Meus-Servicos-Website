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
              ? "border-[rgba(151,28,38,0.2)] bg-white/95"
              : "border-[var(--brand-border)] bg-white/85",
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
            <span className="font-heading text-xl font-normal leading-none text-[var(--brand-ink)] transition-colors group-hover:text-dev">
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
                    className="font-body relative text-sm font-semibold text-[var(--brand-ink-muted)] transition-colors duration-200 after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-dev after:transition-all after:duration-300 hover:text-dev hover:after:w-full"
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
              className="font-body inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] px-4 py-1.5 text-sm font-semibold text-[var(--brand-ink)] transition-all duration-200 hover:border-dev hover:text-dev"
            >
              <Download className="h-4 w-4" />
              Baixar CV
            </Link>
            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="font-body inline-flex items-center gap-2 rounded-full bg-dev px-5 py-1.5 text-sm font-bold !text-white shadow-dev transition-all duration-200 hover:-translate-y-0.5 hover:bg-dev-dark [&_*]:!text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Fale comigo
            </button>
          </div>

          <button
            type="button"
            className="rounded-full p-2 text-[var(--brand-ink)] transition-colors hover:bg-[var(--brand-red-tint)] lg:hidden"
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
          "fixed right-0 top-0 z-[60] flex h-full w-72 flex-col border-l border-[var(--brand-border)] bg-white text-[var(--brand-ink)] transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--brand-border)] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 overflow-hidden rounded-lg border border-dev/40 bg-white">
              <img
                src="/assets/brand/logo-light.png"
                alt="Logo Maiawall"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="font-heading text-xl font-normal leading-tight">
              Maiawall
              <br />
              Wallace Maia
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            className="rounded-lg p-2 text-[var(--brand-ink-muted)] transition-colors hover:bg-[var(--brand-red-tint)] hover:text-[var(--brand-red)]"
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
                className="font-body flex w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-[var(--brand-ink-muted)] transition-all duration-200 hover:bg-[var(--brand-red-tint)] hover:text-[var(--brand-red)]"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 border-t border-[var(--brand-border)] p-5">
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="font-body flex w-full items-center justify-center rounded-xl bg-dev px-5 py-3 text-sm font-bold !text-white transition-all active:scale-[0.98]"
          >
            Fale comigo
          </button>
          <Link
            href={links.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body flex w-full items-center justify-center rounded-xl border border-[var(--brand-border)] bg-white px-5 py-3 text-sm font-bold text-[var(--brand-red)] transition-all hover:bg-[var(--brand-red-tint)]"
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
                className="font-body rounded-lg border border-[var(--brand-border)] bg-white px-3 py-2 text-center text-xs font-semibold text-[var(--brand-ink-muted)] transition-colors hover:bg-[var(--brand-red-tint)] hover:text-[var(--brand-red)]"
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
