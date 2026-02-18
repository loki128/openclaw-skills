import LabHero from '@/components/lab/LabHero';
import LabIngredients from '@/components/lab/LabIngredients';
import LabCertification from '@/components/lab/LabCertification';
import LabMetrics from '@/components/lab/LabMetrics';
import LabPhilosophy from '@/components/lab/LabPhilosophy';
import LabProduct from '@/components/lab/LabProduct';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <LabHero />
      <LabIngredients />
      <LabCertification />
      <LabMetrics />
      <LabPhilosophy />
      <LabProduct />
    </main>
  );
}
