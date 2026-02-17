import KioskClient from "@/components/KioskClient";

export default async function KioskPage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params?.venueId || "";

  return <KioskClient venueId={venueId} />;
}
