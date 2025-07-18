# Product Requirements Document: Community Forum

## 1. Introduction
The Community Forum provides a platform for users to engage with each other, ask questions, share knowledge, and discuss topics related to Sensasi Wangi products and fragrances. It fosters a sense of community and provides a self-service support channel.

## 2. Goals
- To create an interactive space for user discussions and knowledge sharing.
- To build a strong community around the Sensasi Wangi brand.
- To provide an additional channel for users to find answers and support.

## 3. Features

### 3.1. Forum Thread Listing
- Display a list of forum threads.
- Each thread should show its title, author, number of replies, and last activity date.
- Pagination or infinite scrolling for loading more threads.

### 3.2. Thread Details View
- Display the original post of a thread.
- Display all replies to the thread in chronological order.
- Allow users to reply to a thread.
- Allow users to upvote/downvote replies (optional).

### 3.3. Thread Creation
- Authenticated users can create new forum threads.
- Form for entering thread title and content.
- Categorization/tagging of threads (optional).

### 3.4. Search & Filtering
- Search functionality to find threads by keywords in title or content.
- Filter threads by category or tags (if implemented).
- Sort threads by recent activity, most replies, or most popular.

### 3.5. User Profiles in Forum
- Link to user profiles from their posts.
- Display basic user information (e.g., username, avatar, join date) next to their posts.

### 3.6. Moderation (Basic)
- Reporting mechanism for inappropriate content.
- Integration with Admin Panel for content moderation (as defined in PRD_Admin_Panel.md).

## 4. User Stories (Examples)
- As a user, I want to browse existing discussions about perfume blending.
- As a user, I want to create a new thread to ask for recommendations on essential oils.
- As a user, I want to reply to a thread to share my experience with a specific product.
- As a moderator, I want to review reported forum posts for inappropriate content.

## 5. Technical Considerations
- **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI.
- **Backend:** Supabase for storing forum threads and replies.
- **Real-time Updates:** Consider Supabase Realtime for new replies/posts (optional).
- **Text Editor:** Use a rich text editor for post creation (e.g., Tiptap, Quill).
- **Security:** Ensure only authenticated users can post/reply.

## 6. Future Enhancements
- Private messaging between users.
- User reputation system (badges, points).
- Sub-forums or categories.
- Notifications for new replies to subscribed threads.
