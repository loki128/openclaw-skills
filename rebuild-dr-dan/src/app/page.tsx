import Hero from '@/components/sections/Hero';
import IronSection from '@/components/sections/IronSection';
import MoleculeSection from '@/components/sections/MoleculeSection';
import LabSection from '@/components/sections/LabSection';
import StorySection from '@/components/sections/StorySection';
import ProductSection from '@/components/sections/ProductSection';

export default function Home() {
  return (
    <main className="bg-black">
      <Hero />
      <IronSection />
      <MoleculeSection />
      <LabSection />
      <StorySection />
      <ProductSection />
    </main>
  );
}
