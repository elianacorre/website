import { cva } from "class-variance-authority";
import { useMemo } from "react";
import { FieldError as FieldErrorNative, FieldLabel, Field as FieldNative } from "@/components/adapted/field";
import { useFieldContext } from "@/hooks/form-context";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const FIELD = {
  error: cva(
    `flex origin-top items-center gap-2 overflow-hidden rounded-md bg-destructive px-2 text-destructive-foreground 
    transition-[max-height] duration-150 ease-in`,
    { variants: { isInvalid: { true: "max-h-10", false: "max-h-0" } } }
  ),
  errorIcon: cva("icon-[lucide--circle-alert] size-4 py-8"),
  field: cva("gap-2"),
  label: cva("sr-only"),
};

// FIELD -----------------------------------------------------------------------------------------------------------------------------------
export function Field({ children, label }: FieldProps) {
  const { form, name, state } = useFieldContext<string>();
  const isInvalid = useMemo(
    () => (form.state.submissionAttempts > 0 || state.meta.isBlurred) && !state.meta.isValid,
    [form.state.submissionAttempts, state.meta.isBlurred, state.meta.isValid]
  );

  return (
    <FieldNative className={FIELD.field()} data-invalid={isInvalid}>
      <FieldLabel className={FIELD.label()} htmlFor={name}>
        {label}
      </FieldLabel>
      {children(isInvalid)}
      <FieldError errors={state.meta.errors} isInvalid={isInvalid} />
    </FieldNative>
  );
}
export type FieldProps = { children: (isInvalid: boolean) => React.ReactNode; label: string };

// ERROR -----------------------------------------------------------------------------------------------------------------------------------
export function FieldError({ errors, isInvalid }: FieldErrorProps) {
  return (
    <FieldErrorNative className={FIELD.error({ isInvalid })} errors={errors}>
      <span className={FIELD.errorIcon()} />
      {errors[0]?.message}
    </FieldErrorNative>
  );
}
export type FieldErrorProps = {
  errors: { message?: string }[];
  isInvalid: boolean;
};
