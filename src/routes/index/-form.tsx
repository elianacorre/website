import confetti from "canvas-confetti";
import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod/mini";
import { useAppForm } from "@/hooks/form";

// SCHEMA ----------------------------------------------------------------------------------------------------------------------------------
export const zForm = z.object({
  forename: z.string().check(z.minLength(1, "Ce champ est requis")),
  surname: z.string().check(z.minLength(1, "Ce champ est requis")),
  email: z.email("Ce champ doit être un courriel valide"),
  message: z.string().check(z.minLength(1, "Ce champ est requis")),
});

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function IndexForm() {
  const submitRef = useRef<HTMLButtonElement>(null);
  const form = useAppForm({
    defaultValues: { email: "", forename: "", message: "", surname: "" },
    onSubmit: async ({ value }) => {
      if (!submitRef.current) return;
      const rect = submitRef.current.getBoundingClientRect();

      // await createSurvey({ data: valuesToCreate(value) });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
      form.reset();
      toast.success("Merci ! Nous avons bien reçu vos réponses.");
    },
  });

  return (
    <form
      className="flex w-full flex-col items-end gap-4"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <form.AppField name="forename" validators={{ onChange: zForm.shape.forename }}>
          {({ InputField }) => <InputField label="Prénom" type="text" />}
        </form.AppField>
        <form.AppField name="surname" validators={{ onChange: zForm.shape.surname }}>
          {({ InputField }) => <InputField label="Nom" type="text" />}
        </form.AppField>
        <form.AppField name="email" validators={{ onChange: zForm.shape.email }}>
          {({ InputField }) => <InputField label="Courriel" type="email" />}
        </form.AppField>
        <form.AppField name="message" validators={{ onChange: zForm.shape.message }}>
          {({ TextareaField }) => <TextareaField label="Message" />}
        </form.AppField>
        <form.Submit ref={submitRef} />
      </form.AppForm>
    </form>
  );
}
