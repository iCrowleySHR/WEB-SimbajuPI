import formatDate from '../../utils/formatDate';
import { maskCpf } from '../../utils/mask';
import translate from '../../utils/translate';

export default function BeneficiaryInfo({ beneficiary }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Informações do usuário</h3>
      <p><strong>Nome:</strong> {beneficiary?.user?.name}</p>
      <p><strong>Email:</strong> {beneficiary?.user?.email}</p>
      <p><strong>CPF:</strong> {maskCpf(beneficiary?.cpf)}</p>
      <p><strong>Criado em:</strong> {formatDate(beneficiary?.user?.created_at)}</p>
      <p><strong>Última atualização:</strong> {formatDate(beneficiary?.user?.updated_at)}</p>
      <p><strong>Perfil:</strong> {translate(beneficiary?.user?.role)}</p>
    </div>
  );
}
