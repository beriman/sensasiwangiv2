# Product Requirements Document: Info Pages

## 1. Introduction
The Info Pages section of the Sensasi Wangi platform provides essential information to users, including frequently asked questions (FAQ), contact details, privacy policy, terms and conditions, and information about badges/achievements. These pages aim to build trust, provide support, and clarify platform policies.

## 2. Goals
- To provide clear, accessible, and comprehensive information to users.
- To address common user queries and reduce support load.
- To ensure legal compliance with privacy and terms policies.
- To inform users about platform features like badges.

## 3. Features

### 3.1. FAQ Page (`/info/faq`)
- A list of frequently asked questions categorized for easy navigation.
- Expandable/collapsible answers for each question.
- Search functionality within the FAQ (optional).

### 3.2. Contact Page (`/info/contact`)
- Display contact information (e.g., email address, business hours, physical address if applicable).
- A contact form for users to submit inquiries directly.
- Integration with a support ticketing system (optional).

### 3.3. Privacy Policy Page (`/info/privacy`)
- Detailed explanation of how user data is collected, stored, used, and protected.
- Information on user rights regarding their data.
- Clearly state compliance with relevant data protection regulations.

### 3.4. Terms & Conditions Page (`/info/terms`)
- Outline the rules and guidelines for using the Sensasi Wangi platform.
- Cover topics such as user conduct, intellectual property, disclaimers, and limitations of liability.
- Clearly state user and platform responsibilities.

### 3.5. Badges Page (`/info/badges`)
- Display a list of all available badges/achievements on the platform.
- For each badge, show its name, icon, and criteria for earning it.
- Highlight badges the current user has earned (if logged in).

## 4. User Stories (Examples)
- As a new user, I want to find answers to common questions about shipping and returns on the FAQ page.
- As a user, I want to find the official contact email to send a business inquiry.
- As a user, I want to understand how my personal data is handled by reading the Privacy Policy.
- As a user, I want to see what badges I can earn and how to get them.

## 5. Technical Considerations
- **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI.
- **Content Management:** Static content for most pages, potentially dynamic for FAQ if managed via CMS.
- **Contact Form:** Backend endpoint for form submission (e.g., Supabase Functions, API route).
- **Data for Badges:** Fetch badge definitions from a data source (e.g., Supabase table, static JSON).

## 6. Future Enhancements
- Dynamic content management system for easier updates to info pages.
- Live chat support integration on the contact page.
- Multilingual support for all info pages.
