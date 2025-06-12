# SkillSprint: AI-Powered Learning Platform 🚀

Welcome to **SkillSprint**, a cutting-edge, responsive Progressive Web App (PWA) designed to revolutionize learning. SkillSprint provides multi-track educational paths, AI-driven assistance, gamified progress tracking, and a powerful, customizable admin dashboard. This project was expertly crafted with **Hostinger Horizons**.

## ✨ Features In-Depth

-   **Multi-Track Learning**: Comes pre-loaded with four comprehensive courses:
    -   `Full-Stack & DSA` (24 Weeks)
    -   `English Communication` (12 Weeks)
    -   `Design & AI Tools` (15 Weeks)
    -   `Aptitude Prep` (8 Weeks)
-   **AI-Powered Features**: Utilizes Meta Llama-4 via the Together AI API for:
    -   An interactive, floating **AI Chat Panel** for instant help.
    -   Automated **Quiz & Mock Test** generation based on course content.
    -   Engaging **Mini-Games** to make learning fun.
-   **Gamified User Journey**:
    -   **Points & Levels**: Earn points for completing modules to level up.
    -   **Badges**: Unlock achievements for milestones.
    -   **Leaderboard**: Compete with other learners.
    -   **Streaks**: Maintain a daily learning streak to stay motivated.
-   **Personalized Dashboard**: A central hub for learners, featuring:
    -   A dynamic "Today's Plan" to guide daily tasks.
    -   Visual progress bars for each course.
    -   Streak counters and point totals.
-   **PWA Ready**: Enjoy a seamless, native-app-like experience. SkillSprint is fully responsive and installable on desktop (Windows, macOS, Linux) and mobile (iOS, Android).
-   **Powerful Admin Panel**: A secure, role-based dashboard for site administrators to manage the entire platform.
-   **Complete UI Customization**: Admins can modify the platform's appearance, including themes (light/dark/system), colors, fonts, and hero banner content, directly from the admin settings.

## 🚀 Tech Stack & Rationale

This project uses a carefully selected, modern tech stack to deliver a high-performance, scalable, and maintainable application.

| Technology      | Pros                                                                                                   | Cons                                                                                             |
| :-------------- | :----------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **React 18**    | **Component-based architecture** promotes reusability. **Vast ecosystem** of libraries and tools.        | Can have a **steep learning curve**. Performance requires careful state management.              |
| **Vite**        | **Extremely fast** Hot Module Replacement (HMR) for a superior developer experience. **Optimized builds**. | Newer than Webpack, so some complex configurations or plugins might be less mature.              |
| **TailwindCSS** | **Utility-first workflow** speeds up styling. Prevents CSS bloat and ensures design consistency.         | Can lead to verbose HTML. May feel unintuitive for those used to traditional CSS.                |
| **Supabase**    | **All-in-one backend** (DB, Auth, Storage). **Generous free tier**. Auto-generates APIs from your schema. | Potential for **vendor lock-in**. Can become costly at very high scale.                          |
| **Framer Motion**| **Simple, powerful API** for complex animations. Great performance and React integration.               | Adds to the bundle size. Can be overkill for very simple animation needs.                        |

## 📁 Project Structure

The project is organized logically to separate concerns and improve maintainability.

```
.
├── public/                # Static assets, manifest, and service worker
├── src/
│   ├── components/        # Reusable React components (UI, Admin, Dashboard, etc.)
│   │   ├── admin/         # Components specific to the Admin Panel
│   │   ├── dashboard/     # Components for the main user dashboard
│   │   └── ui/            # Generic UI components (shadcn/ui)
│   ├── context/           # React Context providers (e.g., ThemeProvider)
│   ├── data/              # Static data, including course content
│   ├── lib/               # Utility functions (utils, supabaseClient, colorUtils)
│   ├── pages/             # Page components for different admin views
│   │   └── admin/
│   ├── App.jsx            # Main application component and view router
│   ├── index.css          # Global styles and Tailwind directives
│   └── main.jsx           # Application entry point
├── .eslintrc.cjs          # ESLint configuration
├── package.json           # Project dependencies and scripts
├── README.md              # You are here!
└── tailwind.config.js     # TailwindCSS configuration
```

## ⚙️ Admin Panel Guide

The admin panel is the control center for SkillSprint.

### How to Become an Admin

For development and initial setup, an admin account is created using a specific email address.

1.  Click the "Sign In" button on the Navbar.
2.  In the authentication modal, switch to the **"Sign up"** tab.
3.  Use the email **`admin@skillsprint.io`** and any password to create your account.
4.  The application logic will automatically assign the `admin` role to this user.
5.  After logging in, an "Admin" link will appear in the Navbar.

### Admin Features

-   **Dashboard**: Get a high-level overview of platform stats like total users, active courses, and recent signups.
-   **User Management**: View a table of all registered users. (Full CRUD functionality pending Supabase integration).
-   **Settings & UI Customization**:
    -   **General**: Update the site title and tagline.
    -   **Theme & UI**: Switch between light, dark, and system themes. Use color pickers to customize the platform's primary, secondary, and accent colors in real-time.
    -   **Hero Banner**: Customize the main welcome banner by changing the headline, subheadline, and background image.

## 📦 Installation & Setup

This project is configured to run seamlessly within the Hostinger Horizons environment.

1.  **Dependencies**: The environment automatically runs `npm install` when `package.json` is created or updated.
2.  **Run Development Server**: The environment automatically runs `npm run dev`.

## ☁️ Deployment

Deploying your masterpiece is just one click away inside the Hostinger Horizons platform.

1.  Press the **"Publish"** button located at the top-right corner of your screen.
2.  Your web app will be automatically built and deployed to your Hostinger hosting plan.
3.  Remember to whitelist your custom domain in third-party services like Stripe or Google Cloud for them to function in the live environment.
