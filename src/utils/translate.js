
const translations = {
  beneficiary: "Beneficiario",
  ubs: "UBS",
  warehouse: "Almoxarifado",
  secretary: "Secretaria",
};

/**
 * Traduz uma chave em inglês para português.
 * @param {string} key - Chave em inglês
 * @param {boolean} capitalize - opcional, capitaliza a primeira letra
 * @returns {string}
 */
export default function translate(key, capitalize = false) {
  const text = translations[key] || key; // retorna a chave se não achar tradução
  if (capitalize) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return text;
}
