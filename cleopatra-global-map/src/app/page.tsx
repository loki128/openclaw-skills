import Navigation from '@/components/interactive/Navigation';
import CinematicHero from '@/components/cinematic/CinematicHero';
import JourneyTimeline from '@/components/cinematic/JourneyTimeline';
import WeeklyDrops from '@/components/cinematic/WeeklyDrops';
import Footer from '@/components/interactive/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-void">
      <Navigation />
      <CinematicHero />
      <JourneyTimeline />
      <WeeklyDrops />
      <Footer />
    </main>
  );
}
