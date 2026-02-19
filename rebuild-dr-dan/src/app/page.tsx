import Hero from './sections/Hero';
import IronSection from './sections/IronSection';
import MoleculeSection from './sections/MoleculeSection';
import LabSection from './sections/LabSection';
import StorySection from './sections/StorySection';
import ProductSection from './sections/ProductSection';

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
