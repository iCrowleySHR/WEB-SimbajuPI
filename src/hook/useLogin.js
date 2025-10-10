import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useLoading } from "../contexts/LoadingContext";
import routeTable from '../utils/routeTable';
import { useAuth } from "../hook/useAuth";
import { changePasswordTemporary } from '../api/routers/auth';
import getErrorMessage from '../utils/getErrorMessage';
import { sanitizeCpf } from "../utils/sanitize";

export default function useLogin(user, loading) {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const { login } = useAuth();
    

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [staffPassword, setStaffPassword] = useState('');

    const [beneficiaryMessage, setBeneficiaryMessage] = useState('');
    const [beneficiaryType, setBeneficiaryType] = useState('');
    const [staffMessage, setStaffMessage] = useState('');
    const [staffType, setStaffType] = useState('');

    const redirectByRole = (role) => routeTable(role);

    useEffect(() => {
        if (!loading && user) {
            navigate(redirectByRole(user.role));
        }
    }, [user, loading]);

    const submitBeneficiary = async (event) => {
        event.preventDefault();
        if (!cpf || !password) {
            setBeneficiaryType('error');
            setBeneficiaryMessage('CPF e senha são obrigatórios!');
            return;
        }
        try {
            showLoading();
            const response = await login({ cpf: sanitizeCpf(cpf), password });
            setBeneficiaryType('success');
            setBeneficiaryMessage(response.message || 'Login realizado com sucesso!');
            if (response) navigate(redirectByRole(response.role));
        } catch (error) {
            setBeneficiaryType('error');
            setBeneficiaryMessage(getErrorMessage(error));
        } finally {
            hideLoading();
        }
    };

    const submitStaff = async (event) => {
        event.preventDefault();
        if (!email || !staffPassword) {
            setStaffType('error');
            setStaffMessage('Email e senha são obrigatórios!');
            return;
        }
        try {
            showLoading();
            const response = await login({ email, password: staffPassword });
            setStaffType('success');
            setStaffMessage(response.message || 'Login realizado com sucesso!');
            if (response) navigate(redirectByRole(response.role));
        } catch (error) {
            setStaffType('error');
            setStaffMessage(getErrorMessage(error));
        } finally {
            hideLoading();
        }
    };

    const firstAccessBeneficiary = async (data) => {
        try {
            const response = await changePasswordTemporary(data);
            setBeneficiaryType('success');
            setBeneficiaryMessage(response.message || 'Senha redefinida com sucesso! Faça login.');
            return response;
        } catch (error) {
            setBeneficiaryType('error');
            setBeneficiaryMessage(getErrorMessage(error));
            return null;
        }
    };

    const firstAccessStaff = async (data) => {
        try {
            const response = await changePasswordTemporary(data);
            setStaffType('success');
            setStaffMessage(response.message || 'Senha redefinida com sucesso! Faça login.');
            return response;
        } catch (error) {
            setStaffType('error');
            setStaffMessage(getErrorMessage(error));
            return null;
        }
    };

    return {
        cpf, setCpf,
        password, setPassword,
        email, setEmail,
        staffPassword, setStaffPassword,
        beneficiaryMessage, beneficiaryType,
        staffMessage, staffType,
        submitBeneficiary,
        submitStaff,
        firstAccessBeneficiary,
        firstAccessStaff
    };
}
