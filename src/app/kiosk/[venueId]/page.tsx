import KioskClient from "@/components/KioskClient";

export default function KioskPage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params?.venueId || "";

  return <KioskClient venueId={venueId} />;
}
