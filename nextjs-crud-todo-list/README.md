# Firebase CRUD Task App

A protected CRUD app with Firebase Auth & Firestore.

## Technologies Used
- Next.js, TypeScript
- Firebase Authentication, Firestore

## Features
- Firebase Authentication (Email/Password)
- Protected Routes (dashboard requires login)
- CRUD Operations (create, read, update, delete tasks)
- Personalized Dashboard Greeting (shows logged-in user email)

## Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`
3. Add your Firebase config in `app/firebase.ts` using `.env.local`:
   - `NEXT_PUBLIC_FIREBASE_API_KEY=`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID=`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=`
   - `NEXT_PUBLIC_FIREBASE_APP_ID=`
4. Run the app: `npm run dev`
5. Open `http://localhost:3000`

## Deployment Link
Add your live Vercel link here once deployed.

## Screenshots
Include screenshots of login and dashboard pages.

## Testing Credentials
- Email: `testuser@gmail.com`
- Password: `test1234`

Ensure this account exists in Firebase Authentication with one or two tasks in Firestore for demonstration.
