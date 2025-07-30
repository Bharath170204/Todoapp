# Todo App with Firebase Integration

A modern, responsive todo application built with Next.js 15, TypeScript, Tailwind CSS, and Firebase Firestore. This app provides a complete CRUD (Create, Read, Update, Delete) interface for managing todo tasks with real-time data persistence.

## Features

- ✅ **Create** new todo tasks
- ✅ **Read** and display list of all todo tasks
- ✅ **Update** existing todo tasks (text and completion status)
- ✅ **Delete** todo tasks
- ✅ Real-time data persistence with Firebase Firestore
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Error handling and loading states
- ✅ Optimistic updates for better UX
- ✅ Keyboard shortcuts (Enter to save, Escape to cancel)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Firebase project (see [Firebase Setup Guide](./FIREBASE_SETUP.md))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todoapp
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase configuration:
   - Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md)
   - Create a `.env.local` file with your Firebase credentials

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── todo-app.tsx       # Main todo application component
│   └── ui/                # Reusable UI components
│       ├── alert.tsx      # Error alert component
│       ├── button.tsx     # Button component
│       ├── card.tsx       # Card component
│       ├── checkbox.tsx   # Checkbox component
│       ├── input.tsx      # Input component
│       └── loading.tsx    # Loading component
└── lib/
    ├── firebase.ts        # Firebase configuration
    ├── todoService.ts     # Firebase CRUD operations
    ├── useTodos.ts        # Custom hook for todo management
    └── utils.ts           # Utility functions
```

## Usage

### Creating a Todo
- Type your task in the input field
- Press Enter or click the "Add" button
- The todo will be saved to Firebase and appear in the list

### Managing Todos
- **Complete/Uncomplete**: Click the checkbox next to any todo
- **Edit**: Click the edit icon, modify the text, and press Enter or click the checkmark
- **Delete**: Click the trash icon to remove a todo
- **Refresh**: Click the refresh button to reload todos from Firebase

### Keyboard Shortcuts
- **Enter**: Save changes when editing
- **Escape**: Cancel editing and revert changes

## Firebase Configuration

This app uses Firebase Firestore for data persistence. Make sure to:

1. Create a Firebase project
2. Enable Firestore Database
3. Set up security rules
4. Configure environment variables

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js applications. Make sure to:

- Set all required environment variables
- Configure Firebase security rules for production
- Enable proper CORS settings if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
