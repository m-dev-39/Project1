document.getElementById('generate').addEventListener('click', generatePassword);

function generatePassword() {
    const length = document.getElementById('length').value;
    const hasLower = document.getElementById('lowercase').checked;
    const hasUpper = document.getElementById('uppercase').checked;
    const hasNumber = document.getElementById('numbers').checked;
    const hasSymbol = document.getElementById('symbols').checked;

    const result = document.getElementById('result');
    result.value = generatePasswordString(length, hasLower, hasUpper, hasNumber, hasSymbol);
}

function generatePasswordString(length, lower, upper, number, symbol) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    return generatedPassword.slice(0, length);
}

function copyToClipboard() {
    const result = document.getElementById('result');
    if (result.value) {
        result.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    }
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
