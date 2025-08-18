import { convexQuery } from "@convex-dev/react-query";
import { api } from "@ec/convex/api";
import { Footer } from "@ec/ui/components/web/footer";
import { GridBackground } from "@ec/ui/components/web/grid-background";
import { Header, HeaderLogo, HeaderNav, HeaderSocial } from "@ec/ui/components/web/header";
import { SiInstagram, SiYoutube } from "@icons-pack/react-simple-icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, linkOptions, Outlet } from "@tanstack/react-router";

// ROUTE ***********************************************************************************************************************************
export const Route = createFileRoute("/_public")({
	component: PublicLayout,
});

// DATA ************************************************************************************************************************************
const navs = [
	linkOptions({ id: "qui-suis-je", text: "Qui suis-je?", to: "/qui-suis-je" }),
	linkOptions({ id: "cours", text: "Cours", to: "/cours" }),
	linkOptions({ id: "ateliers", text: "Ateliers", to: "/ateliers" }),
	linkOptions({ id: "oeuvres", text: "Œuvres", to: "/oeuvres" }),
];

const socials = [
	{ id: "instagram", text: "Instagram", icon: <SiInstagram />, href: "/" },
	{ id: "youtube", text: "Youtube", icon: <SiYoutube />, href: "/" },
];

// LAYOUT **********************************************************************************************************************************
function PublicLayout() {
	const { data } = useSuspenseQuery(convexQuery(api.layouts.readPublic, {}));
	const { logoImg } = data;

	return (
		<>
			<GridBackground />
			<Header
				logo={
					<Link to="/">
						<HeaderLogo>
							<img {...logoImg} alt={logoImg.alt} />
						</HeaderLogo>
					</Link>
				}
				navs={navs.map((nav) => (
					<Link key={nav.id} to={nav.to}>
						{({ isActive }) => <HeaderNav isActive={isActive} nav={{ ...nav, href: nav.to }} />}
					</Link>
				))}
				socials={socials.map((social) => <HeaderSocial key={social.id} social={social} />)}
			/>
			<main className="relative mt-20 flex-1 sm:mt-28 md:mt-40">
				<Outlet />
			</main>
			<Footer>
				<Link to="/">Mentions légales</Link>
			</Footer>
		</>
	);
}
