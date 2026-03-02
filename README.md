# HabitAI

### _Social Habit Tracking, Verified by AI._

**HabitAI** is a high-performance Progressive Web App (PWA) designed to turn personal growth into a social, gamified experience. Unlike traditional habit trackers, it uses **AI-powered photo validation** to ensure real accountability and a **Global Ranking** system to foster community motivation.

[LinkedIn](https://www.linkedin.com/in/sebastian-midolo/)

---

## 🌟 Key Features

- **📸 AI Photo Validation:** No more "cheating" your streaks. Habit completion is verified through a custom computer vision model hosted on AWS using Docker.
- **🔥 Streak Multipliers:** A dynamic points system that rewards consistency. The longer your streak, the higher your score multiplier.
- **🏆 Global Leaderboard & Badges:** Compete with the community and earn unique badges based on habit volume, follower count, and legendary streaks.
- **🤝 Social Ecosystem:** Follow friends, view their progress, and stay motivated through a native-feeling social feed.
- **📱 Native PWA Experience:** Built as a Progressive Web App for an "app-like" feel on mobile, featuring **Push Notifications** via Firebase Cloud Messaging.
- **🔐 Secure Authentication:** Seamless and secure onboarding using Google OAuth via NextAuth.js.

---

## 🛠️ The Tech Stack

### Frontend

- **Framework:** Next.js 13.5 (App Router) for optimized Server Components and SEO.
- **Language:** TypeScript (Strict type safety).
- **Styling:** Tailwind CSS + Tailwind Animated for fluid, modern UI transitions.
- **UX/UI:** React Webcam (Camera integration), React Hot Toast (Feedback), and JS Confetti (Gamification).

### Backend & Infrastructure

- **Database:** PostgreSQL hosted on **Supabase**.
- **ORM:** Prisma 5.0 for type-safe database management.
- **AI Engine:** Custom validation model containerized with **Docker** and deployed on **AWS**.
- **Analytics:** Vercel Analytics + Hotjar for user behavior insights.
- **Notifications:** Firebase Cloud Messaging (FCM).

---

## 🏗️ Project Architecture

The project follows a modular directory structure designed for scalability and clean separation of concerns:

- **app/**: Utilizing Next.js 13's App Router for nested layouts, dynamic routing (e.g., `habit/[name]`), and server-side logic.
- **components/**: Domain-driven component design (Badges, Camera, Habit, User) to ensure high reusability and maintainability.
- **prisma/**: Centralized schema management and data helper functions.
- **public/**: Houses the PWA manifest and static assets for a native mobile feel.

---

## 🚀 Engineering Highlights

- **Performance:** Optimized for mobile-first interactions with a focus on Core Web Vitals.
- **Scalability:** Decoupled the AI validation logic into a dedicated AWS container, allowing the main application to remain lightweight.
- **Engagement:** Integrated real-time notifications and gamified logic (multipliers/badges) to maximize user retention.
