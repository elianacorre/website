"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// ROOT ************************************************************************************************************************************
export function ThemeToggle() {
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
			{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
		</button>
	);
}
