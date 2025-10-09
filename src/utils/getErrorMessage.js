export default function getErrorMessage(error, maxLength = 100) {
    const message = error?.response?.data?.message;
    if (!message) return 'Erro inesperado. Tente novamente.';

    return message.length > maxLength
        ? message.substring(0, maxLength).trim() + '...'
        : message;
}
