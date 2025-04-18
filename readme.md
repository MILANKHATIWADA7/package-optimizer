# Package Optimizer Web App

This is a web application that helps optimize customer orders into shipping packages based on price and weight constraints. It splits selected products into packages such that:

- Each package does not exceed a total price of **$250**
- Courier charge is calculated based on the total weight
- Weight balancing is applied to minimize courier cost

Built with:
- **Frontend**: React
- **Backend**: Node.js + Express

---

##  Features

- View a list of products with prices and weights
- Select products to add to your order
- Automatically optimize the order into packages
- View optimized packages with total price, weight, and courier charges

---

##  Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- npm (comes with Node.js)

---

##  How to Set Up

### 1. Clone the Repository

```bash
git clone https://github.com/MILANKHATIWADA7/package-optimizer.git
cd package-optimizer


### 2. Install Dependencies

#### Backend
```bash
cd server
npm install


#### Frontend
Open a new terminal window/tab:
```bash
cd client
npm install


---

## How to Run the App

### 1. Start the Backend

In the `server` folder, open a terminal and run:

```bash
node server.js


This will start the backend server on [http://localhost:5000](http://localhost:5000)

### 2. Start the Frontend

In the `client` folder, open a new terminal and run:

```bash
npm run dev

This will start the React app on [http://localhost:5173](http://localhost:5173/)


##  Example

1. Go to the website
2. Select a few products
3. Click "Place Order"
4. View how the products are split into packages efficiently


