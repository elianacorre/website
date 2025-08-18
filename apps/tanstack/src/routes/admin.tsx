import { SignOutButton } from "@clerk/tanstack-react-start";
import { Avatar, AvatarFallback, AvatarImage } from "@ec/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ec/ui/components/dropdown-menu";
import { Separator } from "@ec/ui/components/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@ec/ui/components/sidebar";
import { Toaster } from "@ec/ui/components/sonner";
import { createFileRoute, Link, Outlet, redirect, useLocation } from "@tanstack/react-router";
import {
	BadgeCheckIcon,
	BellIcon,
	BookOpenIcon,
	BoxesIcon,
	CalendarCogIcon,
	ChevronsUpDownIcon,
	ClipboardListIcon,
	CreditCardIcon,
	ImageIcon,
	LogOutIcon,
	MoonIcon,
	PaletteIcon,
	SparklesIcon,
	SunIcon,
	UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchClerkAuth } from "@/lib/auth";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/admin")({
	beforeLoad: async ({ location: { href } }) => {
		const { userId } = await fetchClerkAuth();
		if (!userId) throw redirect({ to: "/sign-in/$", params: { _splat: `?redirect_url=${href}` } });
	},
	component: AdminLayout,
});

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navs: [
		{ href: "/admin/ateliers", label: "Ateliers", Icon: BookOpenIcon },
		{ href: "/admin/evenements", label: "Événements", Icon: CalendarCogIcon },
		{ href: "/admin/inscriptions", label: "Inscriptions", Icon: ClipboardListIcon },
		{ href: "/admin/participants", label: "Participants", Icon: UsersIcon },
		{ href: "/admin/collections", label: "Collections", Icon: BoxesIcon },
		{ href: "/admin/oeuvres", label: "Oeuvres", Icon: PaletteIcon },
		{ href: "/admin/images", label: "Images", Icon: ImageIcon },
	],
};

// PAGE ************************************************************************************************************************************
function AdminLayout() {
	const location = useLocation();

	return (
		<SidebarProvider>
			<Sidebar variant="inset" collapsible="icon">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild>
								<Link to="/admin">
									{/* <img {...ensureImage("logo")} className="size-8" /> */}
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">eliana.corre.com</span>
										<span className="truncate text-xs">Administration</span>
									</div>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarMenu>
							{data.navs.map((nav) => (
								<SidebarMenuItem key={nav.href}>
									<SidebarMenuButton asChild isActive={location.pathname === nav.href}>
										<Link to={nav.href}>
											<nav.Icon />
											<span>{nav.label}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<NavUser user={data.user} />
				</SidebarFooter>
			</Sidebar>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<ThemeToggle />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<Outlet />
				</div>
			</SidebarInset>
			<Toaster position="bottom-center" richColors />
		</SidebarProvider>
	);
}

// NAV USER ********************************************************************************************************************************
export function NavUser({ user }: NavUserProps) {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDownIcon className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<SparklesIcon />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheckIcon />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCardIcon />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<BellIcon />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<SignOutButton>
							<DropdownMenuItem>
								<LogOutIcon />
								Se déconnecter
							</DropdownMenuItem>
						</SignOutButton>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

// THEME TOGGLE ****************************************************************************************************************************
function ThemeToggle() {
	const [dark, setDark] = useState(false);
	useEffect(() => {
		const isDark =
			typeof window !== "undefined" &&
			(localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches));
		setDark(isDark);
		document.documentElement.classList.toggle("dark", isDark);
	}, []);
	const toggle = () => {
		const newDark = !dark;
		setDark(newDark);
		document.documentElement.classList.toggle("dark", newDark);
		localStorage.theme = newDark ? "dark" : "light";
	};
	return (
		<button type="button" onClick={toggle} aria-label="Changer le thème" className="hover:bg-accent ml-2 rounded p-2">
			{dark ? <SunIcon className="size-5" /> : <MoonIcon className="size-5" />}
		</button>
	);
}

// TYPES ***********************************************************************************************************************************
export type NavUserProps = {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
};
