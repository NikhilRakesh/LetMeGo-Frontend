export const validateEmail = (email, setEmailError) => {
    if (email.trim() === '') {
        setEmailError('');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Invalid email format');
    } else {
        setEmailError('');
    }
};


export const getErrorMessage = (error) => {
    if (error.response) {
        const responseDataErrors = error.response.data.errors;
        if (responseDataErrors && responseDataErrors.length >= 0) {
            return responseDataErrors.map((error) => ({
                field: error.attr,
                message: error.detail,
            }));
        }
    }
    return [{ field: 'general', message: 'An error occurred. Please try again later.' }];
};

export const isValidRegNumber = (regNumber, setregNumberError) => {
    const regExPattern = /^[A-Za-z]{2}\d{2}[A-Za-z]{2}\d{4}$/
    if (regExPattern.test(regNumber)) {
        setregNumberError('')
    } else {
        setregNumberError('Please enter a valid vehicle number')
    }
};