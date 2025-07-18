# Product Requirements Document: Admin Panel

## 1. Introduction
The Admin Panel is a secure, centralized interface for administrators and moderators to manage various aspects of the Sensasi Wangi platform. It provides tools for user management, content moderation, order processing, product management, and analytics.

## 2. Goals
- To provide a robust and intuitive interface for platform administration.
- To enable efficient management of users, products, orders, and content.
- To offer insights into platform performance through analytics.
- To ensure secure access based on user roles (Admin, Moderator).

## 3. Features

### 3.1. Authentication & Authorization
- **Login Page:** Secure login for administrators and moderators.
- **Role-Based Access Control (RBAC):** Different levels of access based on assigned roles (e.g., Admin, Curation Moderator, Feedback Moderator).
- **Session Management:** Secure session handling with logout functionality.

### 3.2. Dashboard
- Overview of key metrics (e.g., new users, pending orders, recent feedback).
- Quick links to frequently used administrative sections.

### 3.3. User Management (`/admin/users`)
- View a list of all registered users.
- Search and filter users.
- View user profiles, including their roles, activity, and associated content.
- Manage user roles (e.g., assign/revoke moderator roles).
- Suspend or ban users.

### 3.4. Product Management (`/admin/products`)
- View a list of all products on the platform.
- Search and filter products.
- Edit existing product details (name, description, price, stock, category, images).
- Add new products.
- Delete products.
- Manage product visibility (e.g., approve/reject products for listing).

### 3.5. Order Management (`/admin/orders`)
- View a list of all orders placed on the platform.
- Filter orders by status (e.g., pending, processing, shipped, completed, cancelled).
- View detailed order information (items, customer details, shipping address, payment status).
- Update order status.
- Process refunds (if applicable).

### 3.6. Content Curation (`/admin/curation`)
- Review user-generated content (e.g., product reviews, forum posts, product listings).
- Approve or reject content based on platform guidelines.
- Provide feedback to users on rejected content.

### 3.7. Feedback Management (`/admin/feedback`)
- View and manage user feedback and inquiries.
- Categorize feedback (e.g., bug report, feature request, general inquiry).
- Mark feedback as resolved or pending.
- Respond to user feedback.

### 3.8. Analytics (`/admin/analytics`)
- Display key performance indicators (KPIs) related to sales, user activity, and content.
- Visualize data through charts and graphs (e.g., sales over time, sales by category).
- Provide basic reporting capabilities.

### 3.9. Settings (`/admin/settings`)
- Manage platform-wide settings (e.g., general configurations, notification settings).
- Configure moderation rules.

## 4. User Stories (Examples)
- As an Admin, I want to log in securely to access the administration panel.
- As a Curation Moderator, I want to review new product listings and approve/reject them.
- As an Admin, I want to view sales trends over the last quarter to assess business performance.
- As a Feedback Moderator, I want to respond to a user's bug report and mark it as resolved.

## 5. Technical Considerations
- **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI.
- **Backend:** Supabase for database, authentication, and storage.
- **State Management:** React Context (for authentication), local component state.
- **API Integration:** Direct Supabase client interactions.
- **Security:** Implement proper authentication and authorization checks on both frontend and backend.
- **Data Fetching:** Use React hooks for data fetching with loading and error states.

## 6. Future Enhancements
- More granular permissions for moderator roles.
- Advanced reporting and custom analytics dashboards.
- Audit logs for administrative actions.
- Integration with external tools (e.g., CRM, email marketing).
