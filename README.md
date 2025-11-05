# ResearchHub - Academic Flow Kit (Frontend)

A modern, responsive frontend application for academic research collaboration built with React, TypeScript, Vite, and Clerk authentication.

## 🚀 Features

- **Clerk Authentication**: Secure user authentication with OAuth support (Google, Microsoft, etc.)
- **Role-Based Access Control**: Three user roles (Admin, Researcher, Student) with different permissions
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Real-time State Management**: React Query for efficient data fetching and caching
- **Modern UI**: Beautiful, accessible components built with Radix UI and Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **API Integration**: Seamless backend communication with automatic token management

## 📋 Prerequisites

- Node.js 18+ or Bun
- Clerk account (free tier available at [clerk.com](https://clerk.com))
- Backend API running (see backend README)

## 🛠️ Install

### 1. Install Dependencies

```bash
npm install
# or
bun install
```

### 2. Set Up Clerk

1. Go to [clerk.com](https://clerk.com) and create a free account
2. Create a new application
3. From your Clerk Dashboard, navigate to **API Keys**
4. Copy your Publishable Key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Configuration
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

# API Configuration  
VITE_API_URL=http://localhost:3001/api
```

**Important**: Never commit real API keys to version control!

### 4. Configure User Roles in Clerk

To enable role-based access control, you need to set up public metadata in Clerk:

1. Go to your Clerk Dashboard
2. Navigate to **Users**
3. Click on a user
4. Under **Public Metadata**, add:

```json
{
  "role": "researcher",
  "institution": "Your University"
}
```

Available roles: `admin`, `researcher`, `student`

## 🎯 Development

Start the development server:

```bash
npm run dev
# or
bun dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

## 🏗️ Build for Production

```bash
npm run build
# or
bun run build
```

Preview the production build:

```bash
npm run preview
# or
bun preview
```

## 📁 Project Structure

```
academic-flow-kit/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Auth/        # Authentication components
│   │   ├── Navigation/  # Navigation components
│   │   └── ui/          # Base UI components (shadcn/ui)
│   ├── config/          # Configuration files
│   ├── hooks/           # Custom React hooks
│   │   └── useAuth.tsx  # Clerk authentication hook
│   ├── lib/             # Utility libraries
│   │   ├── api.ts       # API client with auto authentication
│   │   └── utils.ts     # Helper functions
│   ├── pages/           # Application pages
│   │   ├── Auth/        # Login & Register
│   │   ├── Dashboard/   # Role-based dashboards
│   │   ├── Projects/    # Project management
│   │   ├── Tasks/       # Task management
│   │   └── Messages/    # Messaging system
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── .env.local           # Environment variables (create this)
├── package.json
└── vite.config.ts
```

## 🔐 Authentication 

### How Clerk Integration Works

1. **ClerkProvider** wraps the entire application in `main.tsx`
2. **useAuth hook** provides authentication state and user data
3. **ProtectedRoute component** guards routes that require authentication
4. **API client** automatically includes Clerk session tokens in requests
5. **localStorage** caches user data for quick access

### User Roles

- **Admin**: Full access to all features, user management, analytics
- **Researcher**: Can create and manage projects, assign tasks
- **Student**: Can participate in projects, complete tasks, track progress

## 🌐 API Integration

The frontend communicates with the backend using the API client in `src/lib/api.ts`:

```typescript
import { api } from '@/lib/api';

// Get current user
const user = await api.auth.getCurrentUser();

// Get all projects
const projects = await api.projects.getAll();

// Create a new project
const newProject = await api.projects.create({
  title: 'My Research Project',
  description: 'Project description',
});
```

The API client automatically:
- Includes authentication tokens
- Handles errors
- Manages request/response formatting

## 🎨 UI Components

Built with:
- **Radix UI**: Accessible, unstyled component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, customizable components
- **Lucide React**: Modern icon library

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Troubleshooting

### "Missing Clerk Publishable Key" Error

Make sure you've created a `.env.local` file with your Clerk publishable key:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
```

### Authentication Not Working

1. Check that your Clerk keys are correct
2. Ensure the backend is running on the correct port
3. Verify CORS settings in the backend

### API Calls Failing

1. Ensure backend is running (`npm run dev` in backend directory)
2. Check `VITE_API_URL` in `.env.local` matches backend port
3. Verify you're authenticated (check browser console for errors)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
VITE_CLERK_PUBLISHABLE_KEY=your_production_key
VITE_API_URL=https://your-api-domain.com/api
```

## 📖 Learn More

- [Clerk Documentation](https://clerk.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## 📝 License

MIT

---

**Need Help?** Check the troubleshooting section above or open an issue on GitHub.
