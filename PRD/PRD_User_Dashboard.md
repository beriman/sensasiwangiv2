# Product Requirements Document: User Dashboard

## 1. Introduction
The User Dashboard serves as a personalized hub for authenticated users, providing quick access to their orders, purchased products, notifications, messages, wishlist, and profile settings. It aims to offer a comprehensive overview of their activity and preferences on the Sensasi Wangi platform.

## 2. Goals
- To provide a centralized and personalized experience for authenticated users.
- To enable users to easily manage their orders, products, and preferences.
- To keep users informed about important updates and communications.

## 3. Features

### 3.1. Dashboard Overview
- Display a personalized welcome message.
- Quick summary of recent activity (e.g., latest order status, new messages, unread notifications).
- Navigation links to different sections of the dashboard.

### 3.2. My Orders (`/dashboard/orders`)
- View a list of all past and current orders.
- Filter orders by status (e.g., pending, completed, cancelled).
- View detailed order information (items, shipping status, payment details).
- Option to reorder previous purchases.

### 3.3. My Products (`/dashboard/my-products`)
- For sellers: View a list of products they have listed for sale.
- Ability to edit or delete their listed products.
- View product performance metrics (e.g., views, sales).

### 3.4. My Purchases (`/dashboard/purchases`)
- For buyers: View a list of products they have purchased.
- Option to leave a review for purchased products.
- Access to digital products (if applicable).

### 3.5. Wishlist (`/dashboard/wishlist`)
- View a list of products added to their wishlist.
- Ability to remove items from the wishlist.
- Option to move items from wishlist to cart.

### 3.6. Notifications (`/dashboard/notifications`)
- Display a list of all notifications (e.g., order updates, new messages, promotions).
- Mark notifications as read/unread.
- Filter notifications by type.

### 3.7. Messages (`/dashboard/messages`)
- View and manage private messages with other users or platform support.
- Compose new messages.
- Threaded conversation view.

### 3.8. Settings (`/dashboard/settings`)
- Manage personal profile information (name, email, password, shipping address).
- Update notification preferences.
- Manage connected accounts (e.g., social logins).

## 4. User Stories (Examples)
- As a user, I want to see the current status of my latest order on my dashboard.
- As a seller, I want to view and edit the description of a product I'm selling.
- As a buyer, I want to leave a review for a perfume I recently purchased.
- As a user, I want to check my wishlist for items I'm interested in buying later.

## 5. Technical Considerations
- **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI.
- **Backend:** Supabase for user data, orders, products, messages, and notifications.
- **Data Fetching:** Secure and efficient data retrieval based on authenticated user ID.
- **Real-time Updates:** Consider Supabase Realtime for notifications and messages.

## 6. Future Enhancements
- Personalized recommendations based on purchase history and wishlist.
- Integration with shipping carriers for real-time tracking.
- Advanced analytics for sellers on their product performance.
- User-generated content management (e.g., managing their own forum posts).
