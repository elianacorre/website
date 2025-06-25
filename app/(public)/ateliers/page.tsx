import { Hero } from "@/components/ui/hero";
import { ensureImage, getWorkshops } from "@/content";
// import { api } from "@/convex/_generated/api";
// import { preloadQuery } from "convex/nextjs";
import { Booking } from "./_/booking";
import { Items } from "./_/items";

// ROOT ************************************************************************************************************************************
export default async function WorkshopsPage() {
  const preloadedWorkshops = getWorkshops();
  // const preloadedWorkshops = await preloadQuery(api.workshops.readAll);
  return (
    <>
      <Hero title={["Les ateliers", "Art & Yoga"]} button={{ text: "Réserver ma place", to: "#contact" }} image={ensureImage("mains-i")}>
        Les ateliers que je propose s'adressent aux personnes qui souhaitent retrouver un bien-être global. Chaque atelier yog’art est
        construit autour d’une thématique et se compose d’un cours de yoga et d’un ou plusieurs exercices inspirés de l’art thérapie
        (dessin, peinture, danse, écriture…). Pour plus d’informations, n'hésitez pas à me contacter. Voici une présentation de chacun des
        ateliers :
      </Hero>
      <Items preloaded={preloadedWorkshops} />
      <Booking />
    </>
  );
}
