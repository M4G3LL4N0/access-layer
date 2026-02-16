import KioskClient from "@/components/KioskClient";

export const dynamic = "force-dynamic";

export default function KioskPage({ params }: { params: { venueId: string } }) {
  return <KioskClient venueId={params.venueId} />;
}
