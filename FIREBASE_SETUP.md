# Firebase Setup Guide

This todo app is configured to work with Firebase Firestore. Follow these steps to set up Firebase:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name and follow the setup wizard
4. Enable Google Analytics (optional)

## 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database

## 3. Get Firebase Configuration

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Register your app and copy the configuration

## 4. Set Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase configuration.

## 5. Security Rules (Optional)

For production, update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if true; // For development only
    }
  }
}
```

## 6. Run the Application

```bash
npm run dev
```

Your todo app should now be connected to Firebase and ready to use!

## Features

- ✅ Create new todo tasks
- ✅ View list of all todo tasks
- ✅ Update existing todo tasks
- ✅ Delete todo tasks
- ✅ Toggle completion status
- ✅ Real-time data persistence
- ✅ Error handling and loading states
- ✅ Responsive design 