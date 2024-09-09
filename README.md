# Invoice Generator Project

This project dynamically generates an invoice from JSON data using HTML, CSS, and JavaScript. The final invoice is displayed in the browser with data like customer details, product line items, taxes, and totals.

## Project Structure

- **`invoice.html`**: 
  - The main HTML file that serves as the structure for the invoice. It loads the `styles.css` file for styling and the `invoice.js` file for dynamic content.
  - The invoice contains fields for customer details, order information, product line items, tax breakdown, and total amounts.
  
- **`styles.css`**: 
  - The CSS file used to style the invoice. It defines how the elements on the page, such as the tables, headers, and footers, should be displayed.

- **`invoice.js`**: 
  - The JavaScript file responsible for dynamically populating the invoice with data from the `invoice-data.json` file. It also calculates **net amounts**, **tax rates**, **tax descriptions**, and **totals** dynamically based on the provided data.
  - If the place of supply is the same as the place of delivery, it breaks down the tax into CGST and SGST (each at 9%). Otherwise, it applies IGST at 18%.
  - It fetches data from `invoice-data.json` using the Fetch API and fills the appropriate HTML elements with values such as invoice number, item descriptions, and totals.
  - The script also converts the total numeric amount into words.

- **`invoice-data.json`**: 
  - The JSON file that contains the data for the invoice. It includes customer details, line items, prices, tax rates, and more.
  - This file is read by `invoice.js`, which uses the data to generate the invoice dynamically.

## How to Run the Project

### Step 1: Check for Node.js and npm

Before you can run the project, you need to make sure that **Node.js** and **npm** are installed on your machine.

1. **Check if Node.js and npm are installed**:
   - Open your terminal or command prompt and run the following command:
     ```bash
     npm --version
     ```
   - If you get a version number in response (e.g., `6.14.8`), npm is installed.
   - If you don't have npm installed, follow the next steps.

2. **Install Node.js and npm**:
   - Visit the official [Node.js website](https://nodejs.org/).
   - Download the LTS (Long Term Support) version of Node.js for your operating system.
   - Once installed, both **Node.js** and **npm** will be available on your system.
   - You can verify the installation by running:
     ```bash
     node --version
     npm --version
     ```

### Step 2: Install and Run `http-server`

To serve your project files on a local web server, you'll use the `http-server` package, which is provided through npm.

1. **Install `http-server` globally**:
   - Run the following command to install `http-server`:
     ```bash
     npm install -g http-server
     ```

2. **Run the project using `http-server`**:
   - Navigate to your project folder where `invoice.html`, `styles.css`, `invoice.js`, and `invoice-data.json` are located.
   - Run the following command in the terminal:
     ```bash
     http-server
     ```

3. **Access the project**:
   - Once `http-server` is running, it will output a URL such as `http://localhost:8080`.
   - Open the browser and navigate to `http://localhost:8080/invoice.html`.
   - This will load the invoice in the browser with the dynamically populated data from `invoice-data.json`.

## Project Flow

1. **`invoice.html`** is the main file that displays the invoice structure.
2. **`styles.css`** is responsible for the design and layout of the invoice.
3. **`invoice.js`** fetches the invoice data from **`invoice-data.json`**, processes the data (like calculating taxes), and updates the HTML fields dynamically.
4. **`invoice-data.json`** provides all the necessary details (customer info, items, prices) to generate the invoice.

## How the Invoice is Generated

- **Customer & Order Details**: Information about the customer and order (e.g., customer name, address, order number) is fetched from `invoice-data.json` and displayed in the appropriate fields of the invoice.
- **Items**: Each product or service listed in the `items` array of `invoice-data.json` is displayed as a row in the invoice, showing the item description, unit price, quantity, net amount, and tax breakdown.
- **Tax Calculation**: If the place of supply and place of delivery are the same, **CGST** and **SGST** are applied (at 9% each). Otherwise, **IGST** is applied (at 18%). The total tax and final amount are calculated and displayed in the invoice.
- **Net Amount Calculation**: The **net amount** for each line item is calculated as `(Unit Price * Quantity - Discount)`, and the appropriate tax rates are applied based on the **place of supply** and **place of delivery**.
- **Total in Words**: The total amount is also converted into words using a custom JavaScript function and displayed at the bottom of the invoice.

## Example Invoice

The final invoice will look something like the example.pdf provided
