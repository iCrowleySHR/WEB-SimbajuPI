/**
 * Filtra um array de objetos pelo nome ou CPF.
 *
 * @param {Array} items - Array de objetos a filtrar
 * @param {string} searchTerm - Termo de pesquisa
 * @param {string} [nameKey='beneficiaryName'] - Chave do nome no objeto
 * @param {string} [cpfKey='cpf'] - Chave do CPF no objeto
 * @returns {Array} Array filtrado
 */
export function filterByNameOrCpf(items, searchTerm, nameKey = 'beneficiaryName', cpfKey = 'cpf') {
  if (!searchTerm) return items;

  const term = searchTerm.toLowerCase().trim();

  return items.filter((item) => {
    const name = item[nameKey]?.toLowerCase() || '';
    const cpf = item[cpfKey] || '';

    return name.includes(term) || cpf.includes(term);
  });
}
