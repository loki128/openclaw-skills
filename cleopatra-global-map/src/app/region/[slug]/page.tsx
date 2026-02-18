import { regions, getRegionBySlug } from "@/data/regions";
import RegionClient from "./RegionClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RegionPage({ params }: PageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  return <RegionClient region={region} />;
}

export function generateStaticParams() {
  return regions.map((region) => ({
    slug: region.slug,
  }));
}
