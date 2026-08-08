import { readFileSync } from "node:fs";
import { join } from "node:path";

export const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/**
 * Substitui os marcadores {{TOKEN}} de um template HTML pelos valores
 * informados. Marcadores desconhecidos sao preservados para facilitar a
 * edicao dos templates em /src/emails.
 */
export const renderTemplate = (
  template: string,
  tokens: Record<string, string>,
): string =>
  template.replace(
    /\{\{\s*([A-Z0-9_]+)\s*\}\}/g,
    (match, name) => tokens[name] ?? match,
  );

/**
 * Le um template de e-mail do disco. Lido a cada chamada para permitir
 * editar o HTML sem rebuild do servidor.
 */
export const loadEmailTemplate = (name: string): string =>
  readFileSync(join(process.cwd(), "src", "emails", name), "utf8");
