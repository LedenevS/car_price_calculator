chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getPrice") {
      var priceElement = document.querySelector('span.price-amount.undefined');
      var extractedCarPrice = priceElement ? parseInt(priceElement.innerText.replace(/[^\d]/g, '')) : 0;

      // Simulate a click on the delivery tab
      var deliveryTab = document.querySelector('li.uitest-tab-delivery');
      if (deliveryTab) {
          deliveryTab.click();
      }
    
      var deliveryOptions = getDeliveryOptions();
      deliveryOptions.car_price = extractedCarPrice;
      console.log("Delivery Details:", deliveryOptions);
      let price = extractedCarPrice;

      // Wait a bit for potential dynamic content loading
      setTimeout(function() {
          sendResponse({price: price});
      }, 1); // Adjust timeout as necessary
}
});

function getDeliveryOptions() {
  var deliveryOptions = {
      "car_price": 0,
      "optimo": {
          price: 0,
          date_from: null,
          date_to: null
      },
      "standart": {
          price: 0,
          date_from: null,
          date_to: null
      }
  };

  let tbody = document.querySelector('table tbody');
  if (tbody) {
      // Iterate over the first two rows of the table
      for (let trIndex = 1; trIndex <= 2; trIndex++) {
          let row = tbody.querySelectorAll('tr')[trIndex];
          if (row) {
              let type = trIndex === 1 ? "optimo" : "standart";
              let td = row.querySelector('td');
              if (td) {
                  let h4 = td.querySelector('h4');
                  if (h4) {
                      deliveryOptions[type].price = parseInt(h4.innerText.replace(/[^\d]/g, ''));
                      console.log("Delivery Details:", deliveryOptions)
                  }
                  let spanElements = td.querySelectorAll('span');
                  if (spanElements.length >= 2) {
                      deliveryOptions[type].date_from = spanElements[0].innerText;
                      deliveryOptions[type].date_to = spanElements[1].innerText;
                  }
              }
          }
      }
  }
  return deliveryOptions;
}

  