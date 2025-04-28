
# 🍔 QuickBite - Food Delivery App

QuickBite is a responsive and dynamic Food Delivery Web Application built with React, Redux, Tailwind CSS, and parcel.
It allows users to browse restaurants, add food or grocery items to the cart, and securely place orders.

## ✨ Features
- 🍽️ Browse Restaurants and Groceries
- 🛒 Add/Remove items to Cart
- 🏷️ View detailed item pricing and quantity
- 🧮 Automatic subtotal, tax, and total amount calculation
- 📦 Place Orders with Delivery Address
- 🔥 Floating Toast Notifications
- 🎨 Theme support: White-Orange and Grey-Orange
- 🚀 Hosted proxy server on Render to bypass CORS issues

## 🏗️ Tech Stack
- React
- Redux Toolkit
- Tailwind CSS
- React Router
- Framer Motion (for animations)
- Toastify (for notifications)
- Render (for proxy server)

## 🚀 How to Run the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/quickbite.git
cd quickbite
```
(Replace `your-username` with your GitHub username if you fork it.)

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up the Proxy Server (Important for CORS)
We are using a proxy server hosted on Render.

🔗 Proxy GitHub Repo: [quickbite-proxy](https://github.com/abhishekgade790/quickbite-proxy)

You don't need to run it locally — it's already live. If you still want to run locally:

```bash
# Clone proxy server repo
git clone https://github.com/abhishekgade790/quickbite-proxy.git
cd quickbite-proxy

# Install dependencies and start
npm install
npm start
```
The proxy server will run on `http://localhost:5000` by default.

### 4. Start the Development Server
Go back to your main project directory:

```bash
npm run dev
```

Open your browser and visit:
👉 `http://localhost:5173`

## 📦 Deployment
- Frontend is live at: [https://quike-bite.web.app](https://quike-bite.web.app)
- Proxy server is already deployed on Render.

## 🙌 Acknowledgements
Built with ❤️ by Abhishek Gade
