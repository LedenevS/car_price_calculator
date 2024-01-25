document.addEventListener('DOMContentLoaded', function() {
    // Conversion rates
    const EUR_TO_PLN = 4.34;
    const EUR_TO_USD = 1.1;

    // Function to convert currency
    function convertCurrency(price, rate) {
        return (price * rate).toFixed(0);
    }

    // Update popup with prices
    function updatePrices(originPriceEUR, polandOptimoPricePLN, polandStadartPricePLN, belarusOptimoPriceUSD, belarusStandartPriceUSD) {
        document.getElementById('origin_price').textContent = originPriceEUR + ' €';
        document.getElementById('poland_optimo_price').textContent = polandOptimoPricePLN + ' zł';
        document.getElementById('poland_standart_price').textContent = polandStadartPricePLN + ' zł';
        document.getElementById('belarus_optimo_price').textContent = belarusOptimoPriceUSD + ' $';
        document.getElementById('poland_standart_price').textContent = belarusStandartPriceUSD + ' $';

    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getPrice"}, function(response) {
            console.log("Response:", response);
            if (response && response.price) {
                console.log("price:", response.price);
                // let deliveryDetails = response.deliveryOptions;
                // console.log("Response:", deliveryDetails);
    
                // // Extracting car origin price
                // let originPriceEUR = formatPrice(parseFloat(deliveryDetails.car_price));
                // console.log("Car Origin Price EUR:", originPriceEUR);
    
                // // Assuming you have functions to calculate Poland and Belarus prices
                // let polandOptimoPriceEUR = calculatePolandPrice(originPriceEUR) + parseFloat(response.deliveryDetails.optimo.price);
                // let polandStandartPriceEUR = calculatePolandPrice(originPriceEUR) + parseFloat(response.deliveryDetails.standart.price);
                // let polandOptimoPricePLN = convertCurrency(polandOptimoPriceEUR, EUR_TO_PLN);
                // let polandStandartPricePLN = convertCurrency(polandStandartPriceEUR, EUR_TO_PLN);
                // console.log("Poland Optimo Price PLN:", polandOptimoPricePLN);
                // console.log("Poland Standart Price PLN:", polandStandartPricePLN);
    
                // let belarusOptimoPriceEUR = calculateBelarusPrice(originPriceEUR) + parseFloat(response.deliveryDetails.optimo.price);  
                // let belarusStandartPriceEUR = calculateBelarusPrice(originPriceEUR) + parseFloat(response.deliveryDetails.standart.price);
                // let belarusOptimoPriceUSD = convertCurrency(belarusOptimoPriceEUR, EUR_TO_USD);
                // let belarusStandartPriceUSD = convertCurrency(belarusStandartPriceEUR, EUR_TO_USD);
                // console.log("Belarus Optimo Price USD:", belarusPriceUSD);
                // console.log("Belarus Standart Price USD:", belarusPriceUSD);
    
                // // Update Delivery Dates
                // document.getElementById('optimo_date_range').textContent = response.deliveryDetails.optimo.date_from + ' - ' + response.deliveryDetails.optimo.date_to;
                // document.getElementById('standart_date_range').textContent = response.deliveryDetails.standart.date_from + ' - ' + response.deliveryDetails.standart.date_to;
                // // Handling delivery options
                // console.log("Optimo Delivery Details:", deliveryDetails.optimo);
                // console.log("Standart Delivery Details:", deliveryDetails.standart);
                // // Assuming updatePrices updates the UI with the new prices
                // updatePrices(originPriceEUR, polandOptimoPricePLN, polandStandartPricePLN, belarusOptimoPriceUSD, belarusStandartPriceUSD);
    
                
            }
        });
    });
});

function calculatePolandPrice(price) {
    price = parseFloat(price);
    let akciz = price * 0.03;
    let vat = price * 0.23;
    return price + akciz + vat; // Example calculation
}

function calculateBelarusPrice(price) {
    price = parseFloat(price);
    let veshalka = 800;
    let delivery = 300;
    let custom_fee = 3100;
    return price + veshalka + delivery + custom_fee; // Example calculation
}

function formatPrice(price) {
    return (price / 100).toFixed(0);
}