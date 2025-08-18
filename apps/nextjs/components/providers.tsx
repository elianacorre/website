"use client";

import { frFR } from "@clerk/localizations";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

// import { ThemeProvider as NextThemesProvider } from "next-themes";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// ROOT ************************************************************************************************************************************
export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider localization={frFR}>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				{/* <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme> */}
				{children}
				{/* </NextThemesProvider> */}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}
