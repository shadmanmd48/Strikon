import { MOCK_MATCHES } from "@/lib/mockData";
import { notFound } from "next/navigation";
import { MatchHeader } from "./components/MatchHeader";
import { MatchTabs } from "./components/MatchTabs";

// In a real app, generateStaticParams or fetch data

export default async function MatchPage({ params }: { params: { id: string } }) {
  const match = MOCK_MATCHES.find((m) => m.id === params.id);
  
  if (!match) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <MatchHeader match={match} />
      <MatchTabs match={match} />
    </div>
  );
}
