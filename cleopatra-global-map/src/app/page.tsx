import Navigation from '@/components/interactive/Navigation';
import CleanHero from '@/components/cinematic/CleanHero';
import CleanJourney from '@/components/cinematic/CleanJourney';
import CleanDrops from '@/components/cinematic/CleanDrops';
import Footer from '@/components/interactive/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-void">
      <Navigation />
      <CleanHero />
      <CleanJourney />
      <CleanDrops />
      <Footer />
    </main>
  );
}
