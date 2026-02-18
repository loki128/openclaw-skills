import Navigation from '@/components/interactive/Navigation';
import SpacedHero from '@/components/cinematic/SpacedHero';
import SpacedJourney from '@/components/cinematic/SpacedJourney';
import SpacedDrops from '@/components/cinematic/SpacedDrops';
import Footer from '@/components/interactive/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-void">
      <Navigation />
      <SpacedHero />
      <SpacedJourney />
      <SpacedDrops />
      <Footer />
    </main>
  );
}
