import { Hero } from "@/components/ui/hero";
import { ensureImage } from "@/content";

import { Contact } from "./_/contact";
import { Quote } from "./_/quote";
import { Services } from "./_/services";

// ROOT ************************************************************************************************************************************
export default function IndexPage() {
  return (
    <>
      <Hero
        title={["Bienvenue!", "Je suis Eliana"]}
        button={{ text: "Me contacter", to: "#contact" }}
        image={ensureImage("mes-inspirations-et-mes-techniques")}
        className={{ ASIDE: "flex" }}
      >
        Je vous aide à retrouver le calme intérieur et à exprimer votre créativité sans jugement à travers l’art et le yoga.
      </Hero>
      <Services className="lg:-mt-20" />
      <Quote />
      <Contact />
    </>
  );
}
