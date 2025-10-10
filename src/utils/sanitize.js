
export function sanitizeNumeric(value) {
  return (value || "").toString().replace(/\D+/g, "");
}

export function sanitizeCep(cep) {
  const digits = sanitizeNumeric(cep);
  return digits.slice(0, 8); // opcional: limita a 8 chars
}

export function sanitizeCpf(cpf) {
  const digits = sanitizeNumeric(cpf);
  return digits.slice(0, 11); // opcional: limita a 11 chars
}

export function sanitizeLetters(value) {
  return (value || "").toString().replace(/[^a-zA-ZÀ-ÿ\s]+/g, "");
}