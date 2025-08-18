import { frFR } from "@clerk/localizations";
import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import type { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { PropsWithChildren } from "react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// ROOT ************************************************************************************************************************************
export function Providers({ children, convexClient }: ProvidersProps) {
	return (
		<ClerkProvider localization={frFR}>
			<ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
				{/* <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange enableColorScheme> */}
				{children}
				{/* </NextThemesProvider> */}
			</ConvexProviderWithClerk>
		</ClerkProvider>
	);
}

// TYPES ***********************************************************************************************************************************
type ProvidersProps = PropsWithChildren<{ convexClient: ConvexReactClient }>;
