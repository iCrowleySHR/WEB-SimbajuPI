import axios from "axios";

export async function getAddressByCep(cep) {
  const value = cep.replace(/\D/g, "");
  if (value.length !== 8) return null;
  try {
    const res = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
    if (res.data.erro) return null;
    return {
      streetName: res.data.logradouro ?? "",
      neighborhood: res.data.bairro ?? "",
      city: res.data.localidade ?? "",
    };
  } catch (err) {
    console.log("Erro ao buscar CEP", err);
    return null;
  }
}
