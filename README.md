Project Title: authentication-vite

This project demonstrates a simple authentication flow and basic database interaction using the following technologies:

Vite: A fast build tool for modern web development.
Tailwind CSS: A utility-first CSS framework for rapid UI styling.
Supabase: An open-source Firebase alternative that provides authentication, real-time database, and storage services, all built on PostgreSQL.
Features

User Registration: Create new user accounts with email and password.
User Login: Securely authenticate users.
User Profile: Display user information and a personalized welcome message.
Database Storage : Store user avatar url.
Getting Started

Prerequisites:

Node.js and npm (or yarn) installed
A Supabase project created (get your project URL and API key from the Supabase dashboard)
Installation:

Bash
git clone https://your-repository-url.git
cd your-project-name
npm install  

Configuration:
Create a .env file in the root of your project.

Add your Supabase project URL and API key:

VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

Run the Development Server:

Bash
npm run dev
