# Product Requirements Document: School/Courses

## 1. Introduction
The School/Courses feature provides educational content related to fragrances, product creation, or industry knowledge. It aims to empower users with valuable insights and skills, fostering a deeper connection with the Sensasi Wangi brand and its offerings.

## 2. Goals
- To educate users on fragrance-related topics.
- To provide valuable skills and knowledge to the community.
- To enhance user engagement and loyalty.
- To position Sensasi Wangi as an authority in the fragrance industry.

## 3. Features

### 3.1. Course Listing Page (`/school`)
- Display a list of available courses.
- Each course card should show: Course title, brief description, instructor, and progress (if user is enrolled).
- Filtering/sorting options for courses (e.g., by category, difficulty level).

### 3.2. Course Details Page (`/school/course/[slug]`)
- Comprehensive course description.
- Course outline/curriculum with a list of lessons.
- Instructor information.
- Enrollment button (if not enrolled).
- Progress tracking for enrolled users.
- Reviews/ratings for the course.

### 3.3. Lesson View (`/school/course/[slug]/lesson/[lessonId]`)
- Display lesson content (text, images, videos).
- Navigation between lessons within a course.
- Mark lesson as complete button.
- Progress bar for the current lesson and overall course.
- Discussion section for each lesson (optional).

### 3.4. Progress Tracking
- Track user progress through each lesson and course.
- Display completed lessons and overall course completion percentage.
- Certificates of completion (optional).

### 3.5. Search & Discovery
- Search functionality for courses and lessons.
- Categorization of courses (e.g., beginner, advanced, specific topics).

## 4. User Stories (Examples)
- As a user, I want to browse available courses on perfume making.
- As an enrolled user, I want to continue a lesson from where I left off.
- As a user, I want to mark a lesson as complete after finishing it.
- As a user, I want to see my overall progress in a course.

## 5. Technical Considerations
- **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI.
- **Backend:** Supabase for storing course content, lessons, and user progress.
- **Content Delivery:** Efficiently serve text, image, and video content for lessons.
- **User Progress:** Store and update user progress in the database.
- **Authentication:** Ensure only enrolled users can access course content (if courses are paid/exclusive).

## 6. Future Enhancements
- Quizzes or assignments for lessons.
- Instructor dashboards for managing courses.
- Live Q&A sessions with instructors.
- Integration with external learning tools.
- Paid courses and subscription models.
