import { sanitizeCep, sanitizeCpf, sanitizeNumeric } from "./sanitize";

// Máscara de CEP: 00000-000
export function maskCep(value) {
  const digits = sanitizeCep(value);
  if (digits.length > 5) {
    return digits.slice(0, 5) + "-" + digits.slice(5);
  }
  return digits;
}

// Máscara de CPF: 000.000.000-00
export function maskCpf(value) {
  const digits = sanitizeCpf(value);
  let formatted = digits;
  if (digits.length > 3) formatted = digits.slice(0, 3) + "." + digits.slice(3);
  if (digits.length > 6) formatted = formatted.slice(0, 7) + "." + digits.slice(6);
  if (digits.length > 9) formatted = formatted.slice(0, 11) + "-" + digits.slice(9);
  return formatted;
}

// Máscara de telefone: (00) 0000-0000 ou (00) 00000-0000
export function maskTelephone(value) {
  const digits = sanitizeNumeric(value);

  if (digits.length === 0) return "";

  let formatted = digits;

  if (digits.length <= 2) {
    // Só DDD
    formatted = `(${digits}`;
  } else if (digits.length <= 6) {
    // DDD + início do número
    formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length <= 10) {
    // DDD + telefone 8 dígitos
    formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  } else {
    // DDD + telefone 9 dígitos
    formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }

  return formatted;
}