import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./form-context";

const Submit = lazy(() => import("@/components/form/submit"));
const InputField = lazy(() => import("@/components/form/input-field"));
const TextareaField = lazy(() => import("@/components/form/textarea-field"));

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    InputField,
    TextareaField,
  },
  formComponents: {
    Submit,
  },
  fieldContext,
  formContext,
});
