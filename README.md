# 🛍️ Soukify

> A modern full-stack e-commerce platform built with **Next.js 15** and **Payload CMS 3**.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Payload CMS](https://img.shields.io/badge/Payload_CMS-3-000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 👤 Authentication

- Secure user registration & login
- Redirect support after authentication
- Protected routes

### 🛒 Shopping Experience

- Product catalog
- Category filtering
- Product search
- Shopping cart
- Quantity management
- Responsive UI

### 💳 Payments

- Stripe Checkout
- Payment Intents
- Secure payment flow

### 🛠️ Admin Dashboard

Powered by **Payload CMS**

- Manage products
- Manage orders
- Manage customers
- Manage testimonials
- Manage media
- Global website settings

### ⚡ API

- REST API
- GraphQL API

---

# 🏗 Tech Stack

| Layer | Technology |
|-------|------------|
| ⚛️ Framework | Next.js 15 (App Router) |
| 📝 CMS | Payload CMS 3 |
| 🗄 Database | MongoDB + Mongoose |
| 💳 Payments | Stripe |
| 🎨 Styling | Tailwind CSS 4 |
| 🔷 Language | TypeScript |
| 🔌 API | REST + GraphQL |

---

# 🚀 Getting Started

## Prerequisites

- Node.js **20+**
- pnpm **9+**

## Installation

```bash
git clone https://github.com/yourusername/soukify.git

cd soukify

pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open:

```
http://localhost:3000
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

| Variable | Description |
|----------|-------------|
| `DATABASE_URI` | MongoDB connection string |
| `PAYLOAD_SECRET` | Payload CMS secret |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `NEXT_PUBLIC_PAYLOAD_URL` | Public application URL |

---

# 📂 Project Structure

```text
src/
│
├── app/                # Next.js App Router
├── collections/        # Payload Collections
├── components/         # UI Components
├── globals/            # Payload Globals
├── lib/                # Utilities & GraphQL Client
├── hooks/
├── providers/
├── styles/
└── payload.config.ts
```

---

# 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests |
| `pnpm payload` | Payload CMS CLI |

---

# 🚀 Deployment

The easiest way to deploy is with **Vercel**.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the environment variables.
4. Deploy.

---

# 📸 Screenshots

![Homepage](homepage.png)

---

# 🛣 Roadmap

- [x] Authentication
- [x] Product Management
- [x] Shopping Cart
- [x] Stripe Checkout
- [x] Payload CMS Admin
- [ ] Wishlist
- [ ] Product Reviews
- [ ] Order Tracking
- [ ] Email Notifications
- [ ] Multi-language Support

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

# 🌐 Live Demo

https://soukify.vercel.app


---

# 📄 License

This project is licensed under the **MIT License**.
