# Product Requirements Document: User Profile

## 1. Introduction
The User Profile feature allows users to view and manage their personal information, public profile details, and activity on the Sensasi Wangi platform. It serves as a central point for users to control their online identity and interactions.

## 2. Goals
- To provide users with control over their personal and public information.
- To allow users to showcase their activity and contributions on the platform.
- To facilitate communication and interaction between users.

## 3. Features

### 3.1. Public Profile View (`/profile/[slug]`)
- Display user's chosen username/display name.
- Profile picture/avatar.
- Short bio or description.
- List of public contributions (e.g., forum posts, product reviews, products listed for sale).
- Follow/Unfollow button (optional, for social features).
- Contact button (e.g., send message, if private messaging is enabled).

### 3.2. Edit Profile (`/profile` or via Dashboard Settings)
- Authenticated users can edit their profile information.
- **Personal Information:** Name, email (read-only or with verification), password change.
- **Public Profile Details:** Username/display name, bio, profile picture.
- **Contact Information:** Shipping addresses, phone number.
- **Notification Preferences:** Opt-in/out of various notifications.

### 3.3. Activity Feed (Optional)
- Display a chronological feed of the user's activities (e.g., products purchased, reviews left, forum posts).

### 3.4. Privacy Settings (Optional)
- Control visibility of certain profile elements or activities.

## 4. User Stories (Examples)
- As a user, I want to change my profile picture to a new one.
- As a user, I want to update my shipping address for future orders.
- As a user, I want to see all the reviews I have written on products.
- As another user, I want to view a seller's profile to see their other products.

## 5. Technical Considerations
- **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI.
- **Backend:** Supabase for user data storage.
- **Authentication:** Ensure only the authenticated user can edit their own profile.
- **Image Upload:** For profile pictures, similar to product image upload.
- **Data Validation:** Validate all input fields for profile updates.

## 6. Future Enhancements
- Social connections (followers/following).
- Badges and achievements displayed on the profile.
- Public/private profile toggles.
- Integration with social media accounts.
