import { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { changePasswordTemporary } from '../api/routers/auth';
import getErrorMessage from '../utils/getErrorMessage';

export default function useLoginApi() {
    const { login } = useAuth();

    const [beneficiaryMessage, setBeneficiaryMessage] = useState('');
    const [beneficiaryType, setBeneficiaryType] = useState('');
    const [staffMessage, setStaffMessage] = useState('');
    const [staffType, setStaffType] = useState('');

    const loginBeneficiary = async ({ cpf, password }) => {
        if (!cpf || !password) {
            setBeneficiaryType('error');
            setBeneficiaryMessage('CPF e senha são obrigatórios!');
            return null;
        }
        try {
            const response = await login({ cpf, password });
            setBeneficiaryType('success');
            setBeneficiaryMessage(response.message || 'Login realizado com sucesso!');
            return response;
        } catch (error) {
            setBeneficiaryType('error');
            setBeneficiaryMessage(getErrorMessage(error));
            return null;
        }
    };

    const loginStaff = async ({ email, password }) => {
        if (!email || !password) {
            setStaffType('error');
            setStaffMessage('Email e senha são obrigatórios!');
            return null;
        }
        try {
            const response = await login({ email, password });
            setStaffType('success');
            setStaffMessage(response.message || 'Login realizado com sucesso!');
            return response;
        } catch (error) {
            setStaffType('error');
            setStaffMessage(getErrorMessage(error));
            return null;
        }
    };

    const firstAccessBeneficiary = async ({ cpf, password, new_password, new_password_confirmation }) => {
        try {
            const response = await changePasswordTemporary({ cpf, password, new_password, new_password_confirmation });
            setBeneficiaryType('success');
            setBeneficiaryMessage(response.message || 'Senha redefinida com sucesso! Faça login.');
            return response;
        } catch (error) {
            setBeneficiaryType('error');
            setBeneficiaryMessage(getErrorMessage(error));
            return null;
        }
    };

    const firstAccessStaff = async ({ email, password, new_password, new_password_confirmation }) => {
        try {
            const response = await changePasswordTemporary({ email, password, new_password, new_password_confirmation });
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
        beneficiaryMessage,
        beneficiaryType,
        staffMessage,
        staffType,
        loginBeneficiary,
        loginStaff,
        firstAccessBeneficiary,
        firstAccessStaff
    };
}
