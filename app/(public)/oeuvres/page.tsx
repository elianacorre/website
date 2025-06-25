import { Hero } from "@/components/ui/hero";
import { ensureImage, getSets, getWorks } from "@/content";
import { Order } from "./_/order";
import { SetItems } from "./_/set-items";
import { WorkItems } from "./_/work-items";

// ROOT ************************************************************************************************************************************
export default function WorksPage() {
  return (
    <>
      <Hero title={["Découvrez", "mes œuvres"]} button={{ text: "Passer commande", to: "#contact" }} image={ensureImage("mains-i")}>
        Vous retrouverez ici toutes les œuvres que j’ai réalisées. Si l’une d’entre elles résonne avec vous, n’hésitez pas à me contacter.
      </Hero>
      <SetItems sets={getSets()} className="bg-accent lg:-mt-20" />
      <WorkItems works={getWorks()} />
      <Order />
    </>
  );
}
