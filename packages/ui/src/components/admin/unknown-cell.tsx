import { CircleAlertIcon } from "lucide-react";

// ROOT ************************************************************************************************************************************
export function UnknownCell() {
  return (
    <span className="text-destructive flex items-center gap-2">
      <CircleAlertIcon />
      Inconnu
    </span>
  );
}
