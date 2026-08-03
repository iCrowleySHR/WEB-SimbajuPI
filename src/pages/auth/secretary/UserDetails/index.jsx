import { useParams } from "react-router-dom";

import Title from "../../../../components/Title";
import Alert from "../../../../components/Alert";
import UserDetailsComponent from "../../../../components/UserDetailsComponent";

import { useUserDetails } from "../../../../hook/useUserDetails";

export default function UserDetails() {
  const { id } = useParams();

  const {
    user,
    error,
    message,
    refetch,
  } = useUserDetails(id);

  return (
    <>
      <Title
        title="Detalhes do Usuário"
        subtitle="Veja todas as informações do usuário."
        back="true"
      />

      {message && <Alert type="success" message={message} />}
      {error && <Alert type="error" message={error} />}

      {user && (
        <>
          {/* Futuramente pode adicionar um ActionPanelUserDetails aqui */}
          <UserDetailsComponent
            user={user}
            showDetails={true}
          />
        </>
      )}
    </>
  );
}