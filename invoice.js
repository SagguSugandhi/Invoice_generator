// Fetch the JSON data from the external file
fetch('invoice-data.json')
    .then(response => response.json())
    .then(invoiceData => {
        // Injecting dynamic data into the invoice template
        document.getElementById("invoice-number").textContent = invoiceData.invoice_number;
        document.getElementById("invoice-date").textContent = invoiceData.invoice_date;
        document.getElementById("order-number").textContent = invoiceData.order_number;
        document.getElementById("order-date").textContent = invoiceData.order_date;

        document.getElementById("sold-by").textContent = invoiceData.sold_by.name;
        document.getElementById("sold-address").textContent = invoiceData.sold_by.address;
        document.getElementById("sold-pan").textContent = invoiceData.sold_by.pan;
        document.getElementById("sold-gst").textContent = invoiceData.sold_by.gst;

        document.getElementById("billing-name").textContent = invoiceData.billing.name;
        document.getElementById("billing-address").textContent = invoiceData.billing.address;
        document.getElementById("billing-state").textContent = invoiceData.billing.state_code;

        document.getElementById("shipping-name").textContent = invoiceData.shipping.name;
        document.getElementById("shipping-address").textContent = invoiceData.shipping.address;
        document.getElementById("shipping-state").textContent = invoiceData.shipping.state_code;

        document.getElementById("place-supply").textContent = invoiceData.place_of_supply;
        document.getElementById("place-delivery").textContent = invoiceData.place_of_delivery;

        // Constants for tax rates
        const CGST_RATE = 0.09;
        const SGST_RATE = 0.09;
        const IGST_RATE = 0.18;

        // Function to convert numbers to words
        function numberToWords(num) {
            const a = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
                       'Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen',
                       'Eighteen','Nineteen'];
            const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

            const numToWords = (n) => {
                if (n === 0) return '';
                if (n < 20) return a[n];
                if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
                if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' and ' + numToWords(n % 100) : '');
                if (n < 1000000) return numToWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + numToWords(n % 1000) : '');
                return '';
            };

            if (num === 0) return 'zero';
            return numToWords(num);
        }

        // Calculate and display item details
        function calculateInvoice() {
            const itemRows = document.getElementById('item-rows');
            const placeOfSupply = invoiceData.place_of_supply;
            const placeOfDelivery = invoiceData.place_of_delivery;
            
            let grandTotal = 0;

            // Iterate over each item
            invoiceData.items.forEach((item, index) => {
                const netAmount = item.unit_price * item.quantity - item.discount;
                let taxRate, taxType, taxAmount;
                
                if (placeOfSupply === placeOfDelivery) {
                    taxType = 'CGST & SGST';
                    taxRate = `${(CGST_RATE * 100)}% and ${(SGST_RATE * 100)}%`;
                    taxAmount = netAmount * (CGST_RATE + SGST_RATE);
                } else {
                    taxType = 'IGST';
                    taxRate = (IGST_RATE * 100) + '%';
                    taxAmount = netAmount * IGST_RATE;
                }

                const totalAmount = netAmount + taxAmount;
                grandTotal += totalAmount;

                // Create a row for each item
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="center-align">${index + 1}</td>
                    <td>${item.description}</td>
                    <td class="right-align">₹${item.unit_price.toFixed(2)}</td>
                    <td class="center-align">${item.quantity}</td>
                    <td class="right-align">₹${netAmount.toFixed(2)}</td>
                    <td class="center-align">${taxRate}</td>
                    <td class="center-align">${taxType}</td>
                    <td class="right-align">₹${taxAmount.toFixed(2)}</td>
                    <td class="right-align">₹${totalAmount.toFixed(2)}</td>
                `;
                itemRows.appendChild(row);
            });

            // Display the grand total
            document.getElementById('grand-total').textContent = '₹' + grandTotal.toFixed(2);

            // Convert the total amount to words and display it
            document.getElementById('amount-in-words').textContent = numberToWords(Math.floor(grandTotal)) + ' only';
        }

        calculateInvoice();
    });
