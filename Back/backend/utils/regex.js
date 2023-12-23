function useRegexChar(input) {
    let regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
    return regex.test(input);
}

function useRegexRut(input) {
    let regex = /[0-9]+\.[0-9]+\.[0-9]+-[A-Za-z0-9]+/i;
    return regex.test(input);
}

function useRegexNumber(input) {
    let regex = /[0-9]+/i;
    return regex.test(input);
}

function useRegexAlphaNum(input) {
    let regex = /[A-Za-z0-9]+/i;
    return regex.test(input);
}

module.exports = {
    useRegexChar,
    useRegexRut,
    useRegexNumber,
    useRegexAlphaNum,
};