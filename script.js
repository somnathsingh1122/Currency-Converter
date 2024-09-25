// script.js

// Define currency flags (new URL for EUR flag or local path)
const currencyFlags = {
    USD: "https://flagsapi.com/US/flat/64.png",
    IND: "https://flagsapi.com/IN/flat/64.png",
    EUR: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg",  // New EUR flag source
    AUS: "https://flagsapi.com/AU/flat/64.png"
};

// Function to simulate exchange rate fetching (for local testing)
function getExchangeRate(fromCurrency, toCurrency, amount) {
    const rates = {
        USD: { IND: 80, EUR: 0.85, AUS: 1.35 },
        IND: { USD: 0.0125, EUR: 0.011, AUS: 0.017 },
        EUR: { USD: 1.18, IND: 88.5, AUS: 1.58 },
        AUS: { USD: 0.74, IND: 58.25, EUR: 0.63 }
    };

    const rate = rates[fromCurrency][toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    // Update the UI with the converted amount
    document.querySelector('.msg').innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

// Function to update the flag images based on selected currencies
function updateFlags(fromCurrency, toCurrency) {
    const fromFlag = document.querySelectorAll('.select-container img')[0];
    const toFlag = document.querySelectorAll('.select-container img')[1];

    // Update flag images
    fromFlag.src = currencyFlags[fromCurrency];
    toFlag.src = currencyFlags[toCurrency];
}

// Get the form elements
const form = document.querySelector('form');
const amountInput = form.querySelector('input');
const selectElements = form.querySelectorAll('select');
const exchangeButton = form.querySelector('button');

// Event listener for the button click
exchangeButton.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the form from submitting

    // Get the user input values
    const amount = amountInput.value;
    const fromCurrency = selectElements[0].value; // First select is "From" currency
    const toCurrency = selectElements[1].value;   // Second select is "To" currency

    // Fetch and display the exchange rate
    if (amount && fromCurrency && toCurrency) {
        getExchangeRate(fromCurrency, toCurrency, amount);
        updateFlags(fromCurrency, toCurrency); // Update flags when conversion happens
    } else {
        document.querySelector('.msg').innerHTML = 'Please fill in all fields.';
    }
});

// Update flags dynamically when the user selects different currencies
selectElements[0].addEventListener('change', function () {
    const fromCurrency = selectElements[0].value;
    const toCurrency = selectElements[1].value;
    updateFlags(fromCurrency, toCurrency);
});

selectElements[1].addEventListener('change', function () {
    const fromCurrency = selectElements[0].value;
    const toCurrency = selectElements[1].value;
    updateFlags(fromCurrency, toCurrency);
});
