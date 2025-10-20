export default function getErrorMessage(error, maxLength = 100) {
    let message = error?.response?.data?.message;
    
    if (!message || message.trim() === '') {
        message = error?.message;
    }

    if (!message || message.trim() === '') {
        return 'Erro inesperado. Tente novamente.';
    }

    return message.length > maxLength
        ? message.substring(0, maxLength).trim() + '...'
        : message;
}
