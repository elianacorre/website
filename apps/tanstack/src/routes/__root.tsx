import type { ConvexQueryClient } from "@convex-dev/react-query";
import appCss from "@ec/ui/globals.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts, useRouteContext } from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import fontsCss from "../fonts.css?url";

export const Route = createRootRouteWithContext<{
	convexClient: ConvexReactClient;
	convexQueryClient: ConvexQueryClient;
	queryClient: QueryClient;
}>()({
	// beforeLoad: async ({ context: { convexQueryClient } }) => {
	// 	const { token, userId } = await fetchClerkAuth();
	// 	if (token) convexQueryClient.serverHttpClient?.setAuth(token);
	// 	return { token, userId };
	// },
	head: () => ({
		meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "TanStack Start Starter" }],
		links: [
			{ rel: "stylesheet", href: fontsCss },
			{ rel: "stylesheet", href: appCss },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	const { convexClient } = useRouteContext({ from: Route.id });
	return (
		<Providers convexClient={convexClient}>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</Providers>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="fr">
			<head>
				{/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" /> */}
				<HeadContent />
			</head>
			<body className="flex min-h-screen flex-col overflow-x-hidden antialiased">
				{children}
				{/* <TanStackRouterDevtools /> */}
				<Scripts />
			</body>
		</html>
	);
}
