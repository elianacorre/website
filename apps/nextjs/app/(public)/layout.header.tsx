"use client";

import { Header, HeaderLogo, HeaderNav, HeaderSocial } from "@ec/ui/components/web/header";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// ROOT ************************************************************************************************************************************
export function PublicLayoutHeader({ image, navs, socials }: PublicLayoutHeaderProps) {
	const pathname = usePathname();

	return (
		<Header
			logo={
				<Link href="/" passHref>
					<HeaderLogo>
						<Image {...image} />
					</HeaderLogo>
				</Link>
			}
			navs={navs.map((nav) => (
				<Link key={nav.id} href={nav.href} passHref>
					<HeaderNav isActive={pathname === nav.href} nav={nav} />
				</Link>
			))}
			socials={socials.map((social) => <HeaderSocial key={social.id} social={social} />)}
		/>
	);
}

// TYPES ***********************************************************************************************************************************
export type PublicLayoutHeaderProps = {
	image: { height: number; width: number; alt: string; src: string };
	navs: { href: string; id: string; text: string }[];
	socials: { href: string; icon: ReactNode; id: string; text: string }[];
};
