import { Section, SECTION_CONTENT, SECTION_MAIN, SectionImage, SectionTitle } from "@/components/ui/section";
import { ensureImage } from "@/content";

// DATA ************************************************************************************************************************************
export const sections = [];

// ROOT ************************************************************************************************************************************
export default function AboutPage() {
  return (
    <>
      <Section>
        <main className={SECTION_MAIN({ className: "basis-1/2" })}>
          <SectionTitle title={["Découvrez", "mon parcours"]} />
          <p className={SECTION_CONTENT()}>
            Je grandis à l’île de la Réunion, en quête de sens et un peu désoeuvrée face à un monde que j'ai du mal à comprendre, je me
            réfugie dans le dessin à 10 ans. En grandissant, je m’égare sur d’autres voies, questionnant toujours la vie et cherchant un
            sens à cette drôle d’expérience. Je délaisse quelque peu le dessin, occupée à grandir, à me chercher, mais je me sens toujours
            liée à l'art. C’est en 2021 que je renoue définitivement avec les pinceaux, après des années à errer sur les sentiers du doute
            et les montagnes de la peur. Je me jette à corps perdu dans l’art grâce au Milan Art Institute et décide de me faire confiance.
            Je perfectionne mes techniques et trouve petit à petit ma voix, ma lumière. Je comprends alors qu’il est temps de me libérer des
            cases et des freins que je m'étais mis et de vivre totalement mon authenticité.
          </p>
        </main>
        <SectionImage image={ensureImage("mon-parcours")} className={{ BASE: "flex basis-1/2" }} />
      </Section>
      <Section intent="secondary">
        <SectionImage image={ensureImage("mes-inspirations-et-mes-techniques")} reverse />
        <main className={SECTION_MAIN()}>
          <SectionTitle title={["Mes inspirations", "et techniques"]} intent="secondary" />
          <p className={SECTION_CONTENT()}>
            Je peins les énergies que je croise. Je m’inspire de mes rêves, de mon quotidien et de mes sensations. Parfois, une oeuvre
            émerge et le message n'apparaît qu’après. Mon processus de création est minutieux. J'aime combiner les médiums et chaque
            création est unique, à l’image de la nature humaine que je souhaite mettre en lumière. Aujourd'hui, j'ai accepté ma singularité
            et je chemine librement sur les routes de la Vie, en acceptant de me laisser surprendre à tout instant.
          </p>
        </main>
      </Section>
      <Section intent="primary">
        <main className={SECTION_MAIN()}>
          <SectionTitle title={["Mon message", "au monde"]} />
          <p className={SECTION_CONTENT()}>
            Je crois fermement en l’unicité de chaque être et à la nécessité de s’accepter pour pouvoir vivre sa propre aventure. Mon art
            aspire à rappeler aux autres la beauté qu’ils ont en eux, à l’aimer et à la chérir pour qu’ils retrouvent et expriment à leur
            tour leur vraie nature.
          </p>
        </main>
        <SectionImage image={ensureImage("mon-message-au-monde")} />
      </Section>
    </>
  );
}
