"use client";

import { useLenis } from "lenis/react";
import { ArrowUp, Mail, MapPin, Phone, UserRound } from "lucide-react";
import Link from "next/link";

import { getAnchorScrollOptions } from "@/components/common/smooth-scroll";
import {
  contactInfo,
  links,
  navItems,
  site,
  socialLinks,
} from "@/data/dev-content";

export function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, getAnchorScrollOptions(0));
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t-4 border-dev bg-white text-[var(--brand-ink)]">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-lg border border-dev/40 bg-white shadow-sm">
                <img
                  src="/assets/brand/logo-light.png"
                  alt="Logo Maiawall"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-bold">{site.fullName}</span>
            </div>
            <p className="line-clamp-2 text-sm leading-relaxed text-dev-text-muted">
              Desenvolvedor Full Stack apaixonado por criar experiências web
              incríveis e soluções inovadoras.
            </p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--brand-border)] bg-white transition-all hover:-translate-y-0.5 hover:border-dev/50 hover:bg-[var(--brand-red-tint)]"
                >
                  <img
                    src={link.src}
                    alt=""
                    className="h-5 w-5 object-contain"
                  />
                </Link>
              ))}
            </div>
          </section>

          <nav className="space-y-4" aria-label="Links rápidos">
            <h3 className="font-body flex items-center gap-2 text-lg font-semibold">
              <span className="h-6 w-1 rounded bg-dev" />
              Links Rápidos
            </h3>
            <div className="flex flex-col gap-2">
              {navItems.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-sm text-dev-text-muted transition-all hover:translate-x-2 hover:text-dev"
                >
                  <span className="text-dev">→</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </nav>

          <address className="space-y-4 not-italic">
            <h3 className="font-body flex items-center gap-2 text-lg font-semibold">
              <span className="h-6 w-1 rounded bg-dev" />
              Contato
            </h3>
            <div className="space-y-3 text-sm text-dev-text-muted">
              <a
                href={links.email}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-dev"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-dev">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="break-all">{contactInfo.email}</span>
              </a>
              <a
                href="tel:+5535910036806"
                className="flex items-center gap-3 transition-colors hover:text-dev"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-dev">
                  <Phone className="h-4 w-4" />
                </span>
                <span>{contactInfo.phone}</span>
              </a>
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-dev">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>{contactInfo.location}</span>
              </div>
            </div>
          </address>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--brand-border)] pt-8 md:flex-row">
          <p className="text-center text-sm text-dev-text-muted md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-dev">{site.fullName}</span>.
            Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href={links.personalPortfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-ink)] transition-all duration-200 hover:border-dev hover:text-dev"
            >
              <UserRound className="h-4 w-4" />
              Sobre mim
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="grid h-12 w-12 place-items-center rounded-full bg-dev !text-white shadow-dev transition-all hover:scale-110 hover:bg-dev-dark [&_*]:!text-white"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
