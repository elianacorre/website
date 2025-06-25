import { Section, SECTION_CONTENT, SECTION_MAIN, SectionImage, SectionTitle } from "@/components/ui/section";
import { ensureImage } from "@/content";
import { ContactForm } from "./contact.form";

// ROOT ************************************************************************************************************************************
export function Contact({ className }: ContactProps) {
  return (
    <Section id="contact" intent="primary" className={{ BASE: className }}>
      <SectionImage image={ensureImage("beaute-i")} reverse />
      <main className={SECTION_MAIN()}>
        <SectionTitle title={["Vous souhaitez", "me contacter ?"]} />
        <p className={SECTION_CONTENT()}>
          N’hésitez pas à m’écrire pour tout complément d’information. Je répondrai dans les plus brefs délais.
        </p>
        <ContactForm />
      </main>
    </Section>
  );
}

// TYPE ************************************************************************************************************************************
export type ContactProps = { className?: string };
