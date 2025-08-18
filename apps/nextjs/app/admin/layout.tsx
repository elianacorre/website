import { api } from "@ec/convex/api";
import { imageFrom } from "@ec/domain/utils/images";
import { AppSidebar } from "@ec/ui/components/admin/app-sidebar";
import { ThemeToggle } from "@ec/ui/components/admin/theme-toggle";
import { Separator } from "@ec/ui/components/separator";
import { SidebarInset, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@ec/ui/components/sidebar";
import { Toaster } from "@ec/ui/components/sonner";
import { fetchQuery } from "convex/nextjs";
import { BookOpenIcon, BoxesIcon, CalendarCogIcon, ClipboardListIcon, ImageIcon, PaletteIcon, UsersIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";

const navs = [
	{ href: "/admin/ateliers", label: "Ateliers", Icon: BookOpenIcon },
	{ href: "/admin/evenements", label: "Événements", Icon: CalendarCogIcon },
	{ href: "/admin/inscriptions", label: "Inscriptions", Icon: ClipboardListIcon },
	{ href: "/admin/participants", label: "Participants", Icon: UsersIcon },
	{ href: "/admin/collections", label: "Collections", Icon: BoxesIcon },
	{ href: "/admin/oeuvres", label: "Oeuvres", Icon: PaletteIcon },
	{ href: "/admin/images", label: "Images", Icon: ImageIcon },
];

// ROOT ************************************************************************************************************************************
export default async function AdminLayout({ children }: AdminLayoutProps) {
	const entry = await fetchQuery(api.images.readBySlug, { slug: "logo" });
	const image = imageFrom(entry!);

	return (
		<SidebarProvider>
			<AppSidebar
				logo={
					<Link href="/admin">
						<Image {...image} className="size-8" />
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">eliana.corre.com</span>
							<span className="truncate text-xs">Administration</span>
						</div>
					</Link>
				}
				navs={navs.map((nav) => (
					<SidebarMenuItem key={nav.href}>
						<SidebarMenuButton asChild>
							<Link href={nav.href}>
								<nav.Icon />
								<span>{nav.label}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			/>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<ThemeToggle />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
			<Toaster position="bottom-center" richColors />
		</SidebarProvider>
	);
}
type AdminLayoutProps = PropsWithChildren;
