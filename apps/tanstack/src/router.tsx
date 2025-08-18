import { ConvexQueryClient } from "@convex-dev/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NotFound } from "./components/not-found";
import { envPublic } from "./env.public";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const convexQueryClient = new ConvexQueryClient(envPublic.VITE_CONVEX_URL);

	const convexClient = new ConvexReactClient(envPublic.VITE_CONVEX_URL);

	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);

	const router = createTanStackRouter({
		context: { convexClient, queryClient, convexQueryClient },
		defaultPreload: "intent",
		defaultNotFoundComponent: () => <NotFound />,
		routeTree,
		scrollRestoration: true,
		Wrap: ({ children }) => <ConvexProvider client={convexQueryClient.convexClient}>{children}</ConvexProvider>,
	});

	return routerWithQueryClient(router, queryClient);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
