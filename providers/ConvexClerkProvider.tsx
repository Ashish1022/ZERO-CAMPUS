"use client"


import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const ConvexClerkProvider = ({ children }: { children: React.ReactNode }) => (

  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string} appearance={{
    layout: {
      socialButtonsVariant: 'iconButton',
    },
    variables: {
      colorBackground: '#1C1F2E',
      colorPrimary: '#0E78F9',
      colorText: '#fff',
      colorInputBackground: '#252A41',
      colorInputText: '#fff',
    }
  }}>
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  </ClerkProvider>

);

export default ConvexClerkProvider