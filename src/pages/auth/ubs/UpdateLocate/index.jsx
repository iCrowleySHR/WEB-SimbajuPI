import Title from "../../../../components/Title"; 
import { useUser } from "../../../../contexts/UserContext"; 
import LocateForm from "../../../../components/Settings/BeneficiarySettings/LocateForm"; 
import { useLocateSettings } from "../../../../hook/useLocateSettings"; 

export default function UpdateLocate() { 
  const { user } = useUser(); 

  const { 
    cep, setCep, 
    streetName, setStreetName, 
    numberHouse, setNumberHouse, 
    neighborhood, setNeighborhood, 
    city, setCity, 
    messageLocate, 
    handleLocateUpdate 
  } = useLocateSettings(user?.id); 

  return ( 
    <> 
      <Title 
        title={"Atualizar a Localização"} 
        subtitle={"Gerencie a localização da unidade."} 
        back={true} 
      /> 

      <LocateForm 
        cep={cep} 
        setCep={setCep} 
        streetName={streetName} 
        setStreetName={setStreetName} 
        numberHouse={numberHouse} 
        setNumberHouse={setNumberHouse} 
        neighborhood={neighborhood} 
        setNeighborhood={setNeighborhood} 
        city={city} 
        setCity={setCity} 
        handleLocateUpdate={handleLocateUpdate} 
        messageLocate={messageLocate} 
      /> 
    </> 
  ); 
}