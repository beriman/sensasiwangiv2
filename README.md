# SensasiWangi.id - Community Marketplace for Perfume Enthusiasts

Welcome to the source code for **SensasiWangi.id**, a feature-rich web application built with Next.js, designed as a community-driven marketplace and knowledge hub for perfume enthusiasts in Indonesia. This project was collaboratively developed in Firebase Studio.

## About The Project

SensasiWangi.id is more than just a marketplace. It's a comprehensive platform where users can buy and sell unique perfumes, raw materials, and tools, while also engaging with a vibrant community, expanding their knowledge through courses, and discovering local artisans.

### Key Features

This application is packed with features designed for various user roles: buyers, sellers, and administrators.

*   **Dynamic Marketplace (`/browse`):** A clean, searchable marketplace supporting various product types.
*   **Advanced Product Offerings:**
    *   **Product Variants:** Sellers can offer products in multiple sizes and prices (e.g., 50ml, 100ml).
    *   **Sambatan (Group Buys):** Community-driven purchasing for products at a special price.
    *   **Services & Custom Orders:** Sellers can offer services (like custom bottle painting) or made-to-order products with unique fulfillment flows.
*   **AI-Powered Features (`/ai`):**
    *   **Personalized Recommendations:** An AI assistant helps users find products based on their preferences.
    *   **Content Moderation:** AI automatically screens forum posts and user-generated content for safety.
    *   **Curation Screener:** An AI assistant provides an initial assessment of artisan applications for curators.
*   **Community Forum (`/community`):** A full-fledged forum with categories, threads, replies, voting, and in-line moderation tools for moderators.
*   **School of Scent (`/school`):** An e-learning module with courses, lessons, and a dynamic progress tracking system for users.
*   **Nusantarum - The Scent Encyclopedia (`/nusantarum`):** A database to discover and learn about local perfumers, brands, and their creations.
*   **Comprehensive User Dashboards (`/dashboard`):**
    *   **For Buyers:** Manage purchases, wishlist, and messages.
    *   **For Sellers:** Manage products, view incoming orders, and handle shipping.
*   **Full-Fledged Admin Panel (`/admin`):**
    *   Manage users, products, and orders.
    *   View site analytics and sales charts.
    *   A drag-and-drop Kanban board for managing user feedback.

## Tech Stack

This project is built on a modern, robust, and scalable tech stack:

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React](https://reactjs.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **AI Integration:** [Genkit (by Google)](https://firebase.google.com/docs/genkit)
*   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
*   **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (version 18 or higher recommended)
*   npm

### Installation & Running

1.  **Clone the repository** (if applicable)
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Run the development server**
    This command starts the Next.js application.
    ```sh
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) to view it in the browser.

4.  **Run the Genkit development server** (in a separate terminal)
    This command starts the Genkit flows, enabling all AI features.
    ```sh
    npm run genkit:dev
    ```

## Folder Structure

The project follows a standard Next.js App Router structure:

```
.
├── src
│   ├── app/                # Main application routes (pages)
│   │   ├── admin/          # Admin Panel routes
│   │   ├── community/      # Community Forum routes
│   │   ├── dashboard/      # User Dashboard routes
│   │   └── ...
│   ├── ai/                 # Genkit AI flows and configuration
│   │   ├── flows/
│   │   └── genkit.ts
│   ├── components/         # Reusable React components
│   │   ├── admin/
│   │   ├── dashboard/
│   │   └── ui/             # ShadCN UI components
│   ├── data/               # Mock data for products, users, etc.
│   ├── hooks/              # Custom React hooks (e.g., useCart)
│   ├── lib/                # Utility functions, type definitions
│   └── ...
└── ...
```
