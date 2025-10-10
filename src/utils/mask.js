import { sanitizeCep, sanitizeCpf } from "./sanitize";

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
