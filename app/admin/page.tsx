import { auth } from "@clerk/nextjs/server";

export default async function EvenementsPage() {
  const { userId } = await auth();
  if (!userId) return <div>Sign in to view this page</div>;
  return <div>Evenements</div>;
}
