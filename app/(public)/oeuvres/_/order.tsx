import { Section, SECTION_CONTENT, SECTION_MAIN, SectionImage, SectionTitle } from "@/components/ui/section";
import { ensureImage } from "@/content";
import { OrderForm } from "./order.form";

// ROOT ************************************************************************************************************************************
export function Order({ className }: OrderProps) {
  return (
    <Section intent="primary" className={{ BASE: className }}>
      <SectionImage image={ensureImage("beaute-ii")} reverse />
      <main className={SECTION_MAIN()}>
        <SectionTitle title={["Vous souhaitez", "passer commande ?"]} />
        <p className={SECTION_CONTENT()}>
          Tu souhaites me proposer un projet ? Tu as une question sur mes formations ? Tu peux m’envoyer un message via ce formulaire. Je
          répondrais dans les plus brefs délais !
        </p>
        <OrderForm />
      </main>
    </Section>
  );
}

// TYPE ************************************************************************************************************************************
export type OrderProps = { className?: string };
