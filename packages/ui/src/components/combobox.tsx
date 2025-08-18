import { Button } from "@ec/ui/components/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@ec/ui/components/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ec/ui/components/popover";
import { cn } from "@ec/ui/lib/utils";
import { defaultFilter } from "cmdk";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { useMemo, useState } from "react";

export type ComboboxProps = {
	options: { value: string; label: string }[];
	value: string;
	placeholder: string;
	onChange: (value: string) => void;
	className?: string;
	maxResults?: number;
};

export function Combobox({ options, value, placeholder, onChange, className, maxResults = 7 }: ComboboxProps) {
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	const filteredOptions = useMemo(() => {
		if (!searchValue.trim()) {
			return options;
		}

		const scoredOptions = options
			.map((option) => ({
				option,
				score: defaultFilter(option.label.toLowerCase(), searchValue.toLowerCase()),
			}))
			.filter((item) => item.score > 0)
			.sort((a, b) => b.score - a.score)
			.slice(0, maxResults)
			.map((item) => item.option);

		return scoredOptions;
	}, [options, searchValue, maxResults]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" aria-expanded={open} className={cn("w-fit min-w-64 justify-between", className)}>
					{value ? options.find((option) => option.value === value)?.label : placeholder}
					<ChevronsUpDownIcon className="shrink-0 text-muted-foreground" size={16} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-fit min-w-64 p-0" align="start">
				<Command shouldFilter={false}>
					<CommandInput placeholder={placeholder} className="h-9" onValueChange={setSearchValue} />
					<CommandList>
						<CommandEmpty>No records found.</CommandEmpty>
						<CommandGroup>
							{filteredOptions.map((option) => (
								<CommandItem
									key={option.value}
									value={option.value}
									onSelect={(currentValue) => {
										onChange(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{option.label}

									<Check className={cn("ml-auto", value === option.value ? "opacity-100" : "opacity-0")} />
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
