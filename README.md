# 🛒 বাজার দর | BazarDor

### Your Daily Market Price Guide

**BazarDor** is a web-based market price information platform designed to make everyday product prices easier to explore. It provides a user-friendly interface where users can browse product categories, view product details, and identify products with increasing or decreasing prices.

Built with modern web technologies, BazarDor aims to present market price information in a clear, organized, and responsive experience for users.

---

## ✨ Key Features

* **📊 Market Price Overview** — Explore product prices through a clean and organized interface.
* **📈 Price Movement Tracking** — View products with increased and decreased prices in dedicated sections.
* **🗂️ Category-Based Navigation** — Browse products by category for easier discovery.
* **🔎 Product Details** — Open individual product pages to view available product and pricing information.
* **🔐 Authentication & Profile Management** — Sign up, sign in, update your profile name, and sign out.

---

## 🛠️ Technologies Used

| Technology         | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| Next.js 16         | React-based web application framework           |
| React 19           | Building interactive and reusable UI components |
| TypeScript         | Type-safe development                           |
| Next.js App Router | Page routing and application layouts            |
| Tailwind CSS 4     | Responsive styling and utility-first CSS        |
| daisyUI            | Ready-to-use UI components                      |
| Better Auth        | User authentication                             |
| REST API           | Retrieving product and category data            |

---

## 🌐 API Configuration

BazarDor uses the following API base URL to retrieve product and category information.

**API Base URL:**

```text
https://api.abcz.workers.dev/api/bazardor
```

### Environment Variables

Create a `.env.local` file in the root directory of the project and add:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.abcz.workers.dev/api/bazardor
```

The application can use this environment variable to configure its API requests.

> **Security note:** Never commit private API keys, authentication secrets, or database credentials to a public repository.

---

## 🚀 Getting Started

Follow the steps below to run BazarDor on your local machine.

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* [Git](https://git-scm.com/)
* [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### 1. Clone the Repository

Replace the placeholder with your actual GitHub repository URL.

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd bazar-dor
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create `.env.local` in the project root and add the API URL shown in the API Configuration section above.

Add any other environment variables required by your authentication and database configuration.

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Open the Application

Visit the following URL in your browser:

http://localhost:3000

---

## 📁 Project Structure

```text
bazar-dor/
├── public/                  # Static assets and images
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx         # Home page
│   │   ├── layout.tsx       # Root layout
│   │   ├── products/        # Product detail pages
│   │   ├── signup/          # Registration page
│   │   └── ...              # Other application routes
│   ├── components/          # Reusable UI components
│   │   └── Navbar/          # Navigation and profile components
│   ├── lib/                 # API and authentication utilities
│   └── types/               # TypeScript types
├── .env.local               # Local environment variables
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

*Note: This is an illustrative overview. Adjust the folder structure to match your actual project.*

---

## 📱 Responsive Design

BazarDor is designed with responsive layouts in mind to provide a convenient browsing experience across desktop, tablet, and mobile screen sizes.

## 🎯 Project Objectives

* Make product price information easier to access.
* Present price changes in a clear and understandable way.
* Organize products through category-based navigation.
* Provide a simple and user-friendly interface.
* Apply modern frontend development practices using Next.js and TypeScript.

---

## 🔮 Future Improvements

Potential future enhancements include:

* Historical price charts and trend analysis.
* Product search and advanced filtering.
* More detailed market reports.
* Additional data sources and expanded product coverage.

*These are potential improvements, not claims about currently implemented functionality.*

---

## 👨‍💻 Development

To create a production build, run:

```bash
npm run build
```

To start the production server after building, run:

```bash
npm run start
```

---

## 📄 License

No license has been specified yet. Add a `LICENSE` file if you intend to distribute the project under a particular open-source license.

---

**Project Name:** বাজার দর (BazarDor)

**Built with:** Next.js, React, TypeScript, Tailwind CSS, and daisyUI

⭐ If you find this project interesting, consider giving the repository a star!
