const COUNTRY_CODE = "55";

/**
 * Remove todos os caracteres nao numericos de um numero de WhatsApp,
 * aceita numeros brasileiros (10 ou 11 digitos locais) e devolve o
 * numero normalizado no formato internacional com o codigo do pais.
 *
 * Retorna uma string vazia quando o numero e invalido.
 */
export function normalizePhone(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith(COUNTRY_CODE)) {
    digits = digits.slice(COUNTRY_CODE.length);
  }

  digits = digits.replace(/^0+/, "");

  if (digits.length < 10 || digits.length > 11) {
    return "";
  }

  return `${COUNTRY_CODE}${digits}`;
}

export function isValidBrPhone(value: string): boolean {
  return normalizePhone(value).length > 0;
}

/**
 * Aplica a mascara brasileira "(00) 00000-0000" enquanto o usuario digita.
 */
export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) {
    return "";
  }
  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/**
 * Formata um numero ja normalizado (ex.: "5535999999999") para exibicao
 * como "(35) 99999-9999". Numeros invalidos retornam o valor de entrada.
 */
export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith(COUNTRY_CODE)) {
    digits = digits.slice(COUNTRY_CODE.length);
  }

  if (digits.length !== 10 && digits.length !== 11) {
    return value;
  }

  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
}
