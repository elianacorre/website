import { api } from "@ec/convex/api";
import { Footer } from "@ec/ui/components/web/footer";
import { GridBackground } from "@ec/ui/components/web/grid-background";
import { SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";
import { PublicLayoutHeader } from "./layout.header";

// DATA ************************************************************************************************************************************
const navs = [
	{ id: "qui-suis-je", text: "Qui suis-je?", href: "/qui-suis-je" },
	{ id: "cours", text: "Cours", href: "/cours" },
	{ id: "ateliers", text: "Ateliers", href: "/ateliers" },
	{ id: "oeuvres", text: "Œuvres", href: "/oeuvres" },
];

const socials = [
	{ id: "instagram", text: "Instagram", icon: <SiInstagram />, href: "/" },
	{ id: "youtube", text: "Youtube", icon: <SiYoutube />, href: "/" },
];

// ROOT ************************************************************************************************************************************
export default async function PublicLayout({ children }: PublicLayoutProps) {
	const { logoImg } = await fetchQuery(api.layouts.readPublic);

	return (
		<>
			<GridBackground />
			<PublicLayoutHeader image={logoImg} navs={navs} socials={socials} />
			<main className="relative mt-20 flex-1 sm:mt-28 md:mt-40">{children}</main>
			<Footer>
				<Link href="#">Mentions légales</Link>
			</Footer>
		</>
	);
}

// TYPES ***********************************************************************************************************************************
type PublicLayoutProps = Readonly<{ children: React.ReactNode }>;
