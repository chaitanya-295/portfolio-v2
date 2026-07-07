# 🌌 Cosmic Developer Portfolio & CMS

A premium, interactive developer portfolio featuring a dynamic **3D rotating spiral galaxy background** rendered via HTML5 Canvas, a clean **glassmorphic UI**, and a fully-integrated **Admin CMS Panel** powered by **React 19, Vite, and Firebase**.

---

## 📖 Table of Contents
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [🔥 Firebase Setup & Configuration](#-firebase-setup--configuration)
- [🛡️ Firestore Security Rules](#️-firestore-security-rules)
- [📁 Folder Structure](#-folder-structure)
- [📜 Project Scripts](#-project-scripts)
- [👤 Author & Contributions](#-author--contributions)

---

## ✨ Key Features

### 🌀 3D Interactive Galaxy Canvas
- Built with a custom raw HTML5 Canvas 3D projection engine.
- Renders **650+ stars** mapped across a logarithmic 4-arm spiral galaxy and **12+ nebula clouds** with deep purple, cyan, magenta, and indigo gradients.
- **Mouse parallax tilt logic:** Smooth interpolation (Lerping) tilts the galaxy as the mouse moves over the viewport.
- Twin sparkling shooting star overlays for a premium cosmic ambiance.

### 🛡️ Built-in Admin Panel (CMS)
- Fully authenticated workspace allowing the administrator to manage all portfolio contents dynamically.
- Add, update, and delete **Projects, Skills, Certifications, Services/Offerings, and Blog Posts**.
- Manage incoming **inquiries/messages** from visitors directly within the dashboard.
- Approve or reject submitted user **Testimonials/Feedback** before they go public.

### 📡 Real-time Sync & Local Fallback
- Listens to data mutations in real-time using Firestore `onSnapshot` subscriptions.
- Features a **local data mode fallback**: if Firebase credentials are not supplied or environment variables are empty, the app functions smoothly using local mock data.

### ✍️ Cosmic Blog System
- Complete blogging suite supporting categories, reading times, cover images, custom ambient glow cards, and rich post detail pages.

### 📨 Telemetry & Feedback
- Includes a contact form validating user inputs before submitting direct messages to the Admin database.
- Integrated review/testimonial submission modal.

---

## 🛠️ Tech Stack

- **Core Framework:** React 19.x & Vite 8.x
- **Database & Sync:** Firebase 12.x (Firestore & Auth)
- **Styling:** Custom Vanilla CSS (Design system utilizing CSS custom properties, glassmorphism filters, Intersection Observer reveal-on-scroll animations)
- **Routing:** Hash-based single-page application router

---

## 🚀 Quick Start & Installation

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd Protfolio
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory by copying the `.env.example` template:
```bash
cp .env.example .env
```
Open `.env` and configure your Firebase credentials and admin email:
```env
# Firebase Configuration Keys
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Authorized Admin Email
VITE_ADMIN_EMAIL=chaitanyakamble2005@gmail.com
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🔥 Firebase Setup & Configuration

To enable the database sync and admin panel features, follow these steps to set up Firebase:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project**.
2. Enable **Firestore Database** in production or test mode. Create the required collections listed below.
3. Enable **Authentication** and turn on the **Email/Password** sign-in provider.
4. Register the admin account under Authentication using the same email address defined in your `.env` (e.g. `chaitanyakamble2005@gmail.com`).
5. Set up the security rules.

### Firestore Collections Structure
The portfolio CMS relies on the following Collections:
* `profile` — Profile name, tags, bio descriptions, social URLs, and CV.
* `services` — Core engineering / design offerings.
* `skills` — Technologies, databases, and general skill sets.
* `projects` — Case studies, images, category, code URLs, and custom tags.
* `certifications` — Credentials, dates, and verification links.
* `blogs` — Articles, publish date, category, read time, and text content.
* `contacts` — Inbox logs containing user messages.
* `testimonials` — User feedback reviews waiting for admin moderation.

---

## 🛡️ Firestore Security Rules

Copy the security rules from [firestore.rules](file:///c:/Users/Chaitanya%20Kamble/Desktop/project/Protfolio/firestore.rules) into your Firebase console Firestore Rules section.

Key restrictions enforced:
- **Public access:** Anyone can read services, projects, certifications, skills, profile, and blogs.
- **Form submissions:** Anyone can write new messages into the `contacts` collection and submit new ratings into the `testimonials` collection.
- **Admin authentication:** Writes (create, update, delete) to core pages, and reading of incoming contacts, is restricted to the administrator check:
```javascript
function isAdmin() {
  return request.auth != null && 
         request.auth.token.email.lower() == 'chaitanyakamble2005@gmail.com';
}
```

---

## 📁 Folder Structure

```
├── public/                 # Static assets (images, icons)
├── src/
│   ├── assets/             # Images, local icons, and SVGs
│   ├── components/         # React Components
│   │   ├── GalaxyBackground.jsx   # 3D canvas animation background
│   │   ├── Navbar.jsx             # Floating navigation bar
│   │   ├── Hero.jsx               # Hero landing section + main page sections
│   │   ├── AdminPanel.jsx         # Portfolio Management CMS (200KB+)
│   │   ├── ContactPage.jsx        # Inquiries form + social links
│   │   └── ...
│   ├── data/               # Local fallbacks + Firestore hook listeners
│   │   ├── profile.jsx            # Profile hooks & cached store
│   │   ├── projects.jsx           # Projects hook & SVG icon maps
│   │   └── ...
│   ├── App.jsx             # Hash route coordinator & Observer triggers
│   ├── main.jsx            # React root application bootstrap
│   ├── index.css           # Global typography, color system & animations
│   └── firebase.js         # Firebase init logic with local fallback validation
├── firestore.rules         # Security configuration for Firebase Firestore
├── vite.config.js          # Vite build config
└── package.json            # Scripts and dependencies
```

---

## 📜 Project Scripts

Run the following commands in the project root:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite application in development mode with HMR |
| `npm run build` | Builds the optimized production assets into `dist/` |
| `npm run preview` | Runs a local preview of the production build |
| `npm run lint` | Lints the project codebase utilizing ESLint |

---

## 👤 Author & Contributions

Created and maintained by **Chaitanya Kamble**.

Feel free to connect or send a message through the contact page:
- **Email:** chaitanyakamble2005@gmail.com
- **LinkedIn:** [Chaitanya Kamble Profile](https://www.linkedin.com/) *(Update with actual link)*
- **WhatsApp:** [+91 97305 93429](https://wa.me/919730593429)
