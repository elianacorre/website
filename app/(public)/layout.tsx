import { GridBackground } from "@/components/ui/grid-background";
import { Footer } from "./_/footer";
import { Header } from "./_/header";

// ROOT ************************************************************************************************************************************
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <GridBackground />
      <Header />
      <main className="relative mt-20 flex-1 sm:mt-28 md:mt-40">{children}</main>
      <Footer />
    </>
  );
}

// TYPES ***********************************************************************************************************************************
type PublicLayoutProps = Readonly<{ children: React.ReactNode }>;
