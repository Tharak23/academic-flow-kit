import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";
import { config } from "./config";

// Validate Clerk configuration
if (!config.clerkPublishableKey) {
  throw new Error("Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={config.clerkPublishableKey}>
    <App />
  </ClerkProvider>
);
