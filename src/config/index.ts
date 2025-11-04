export const config = {
  clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
};

// Validate configuration
if (!config.clerkPublishableKey) {
  console.warn('⚠️  WARNING: VITE_CLERK_PUBLISHABLE_KEY is not set in environment variables');
}

