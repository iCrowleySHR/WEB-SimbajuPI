import formatDate from '../../utils/formatDate';
import translate from '../../utils/translate';

export default function UserInfo({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Informações do usuário</h3>
      <p><strong>Nome:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Criado em:</strong> {formatDate(user?.created_at)}</p>
      <p><strong>Última atualização:</strong> {formatDate(user?.updated_at)}</p>
      <p><strong>Perfil:</strong> {translate(user?.role)}</p>
    </div>
  );
}
