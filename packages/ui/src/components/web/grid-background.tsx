import { tv } from "tailwind-variants";

// STYLES **********************************************************************************************************************************
export const GRID_BACKGROUND = tv({
	slots: {
		BASE: `absolute inset-0 bg-size-[30px_30px] from-[#efefef] from-[1px] to-[transparent] to-[1px] bg-[linear-gradient(to_right,var(--tw-gradient-from)_var(--tw-gradient-from-position),var(--tw-gradient-to)_var(--tw-gradient-to-position)),linear-gradient(to_bottom,var(--tw-gradient-from)_var(--tw-gradient-from-position),var(--tw-gradient-to)_var(--tw-gradient-to-position))]`,
		// bg-[linear-gradient(to_right,var(--tw-gradient-positions)),linear-gradient(to_bottom,var(--tw-gradient-positions)]`, FIXME: Tailwind
		RADIAL: `pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-radial-[ellipse_at_center,transparent_20%,black]`,
	},
});
export const { BASE, RADIAL } = GRID_BACKGROUND();

// ROOT ************************************************************************************************************************************
export function GridBackground() {
	return (
		<>
			<div className={BASE()} />
			<div className={RADIAL()} />
		</>
	);
}
