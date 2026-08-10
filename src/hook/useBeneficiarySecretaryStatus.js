import { useState, useEffect } from "react";
import { disableBeneficiaryById, getBeneficiaryById } from "../api/routers/beneficiary";
import { updateSecretaryStatus, uploadFileSecretary, maintainStatus } from "../api/routers/status";
import getErrorMessage from "../utils/getErrorMessage";
import { useLoading } from "../contexts/LoadingContext";

export function useBeneficiarySecretaryStatus(beneficiaryId) {
  const [beneficiary, setBeneficiary] = useState(null);
  const [error, setError] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const [errorFile, setErrorFile] = useState("");
  const [messageUpdate, setMessageUpdate] = useState("");
  const [messageFile, setMessageFile] = useState("");
  const [message, setMessage] = useState("");

  const [secretaryStatus, setSecretaryStatus] = useState("");
  const [observationSecretary, setObservationSecretary] = useState("");

  const [files, setFiles] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  const handleMaintainStatus = async () => {
    if (!beneficiary?.status?.id) return;

    try {
        setErrorUpdate("");
        setMessageUpdate("");
        showLoading();

        const response = await maintainStatus(
            beneficiary.status.id
        );

        setBeneficiary((prev) => ({
            ...prev,
            status: response
        }));

        setMessageUpdate({
            type: "success",
            text: "Status mantido com sucesso!"
        });

    } catch (err) {
        setErrorUpdate(getErrorMessage(err));
    } finally {
        hideLoading();
    }
};

  const fetchBeneficiary = async () => {
    try {
      setError("");
      setMessage("");
      showLoading();

      const response = await getBeneficiaryById(beneficiaryId);
      if (!response) {
        setMessage("Beneficiário não encontrado.");
        setBeneficiary(null);
        return;
      }

      setBeneficiary(response);
      setSecretaryStatus(response.status?.secretaryStatus || "");
      setObservationSecretary(response.status?.observationSecretary || "");

    } catch (err) {
      setError(getErrorMessage(err));
      setBeneficiary(null);
    } finally {
      hideLoading();
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!beneficiary?.status?.id) return;

    try {
      setErrorUpdate("");
      setMessageUpdate("");
      showLoading();

      const response = await updateSecretaryStatus(beneficiary.status.id, { "secretaryStatus": secretaryStatus, "observationSecretary": observationSecretary });

      setBeneficiary((prev) => ({ ...prev, status: response }));
      setMessageUpdate({ type: "success", text: "Status atualizado com sucesso!" });
      if(secretaryStatus == "Indeferido"){
          await disableBeneficiaryById(beneficiaryId);
      }
    } catch (err) {
      setErrorUpdate(getErrorMessage(err));
    } finally {
      hideLoading();
    }
  };

  const handleUploadFiles = async (e) => {
    e.preventDefault();
    if (!beneficiary?.status?.id || files.length === 0) return;

    try {
      setErrorFile("");
      setMessageFile("");
      showLoading();

      const formData = new FormData();
      formData.append("file", files[0]); 

        

      await uploadFileSecretary(beneficiary.status.id, formData);

      setMessageFile({ type: "success", text: "Arquivo enviado com sucesso!" });
      setFiles([]);
      setTimeout(async () => {
          await fetchBeneficiary();
      }, 1200);

    } catch (err) {
      setErrorFile(getErrorMessage(err));
      console.log(err);
    } finally {
      hideLoading();
    }
  };




  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  useEffect(() => {
    if (beneficiaryId) fetchBeneficiary();
  }, [beneficiaryId]);

  return {
    beneficiary,
    error,
    errorUpdate,
    errorFile,
    messageUpdate,
    message,
    messageFile,
    secretaryStatus,
    setSecretaryStatus,
    observationSecretary,
    setObservationSecretary,
    files,
    handleFileChange,
    handleUpdateStatus,
    handleUploadFiles,
    handleMaintainStatus
  };
}
