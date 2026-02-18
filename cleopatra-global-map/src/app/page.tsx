import AtelierNav from '@/components/atelier/AtelierNav';
import MidnightHero from '@/components/atelier/MidnightHero';
import AtelierRegions from '@/components/atelier/AtelierRegions';
import AtelierDrop from '@/components/atelier/AtelierDrop';
import AtelierFooter from '@/components/atelier/AtelierFooter';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <AtelierNav />
      <MidnightHero />
      <AtelierRegions />
      <div id="drop">
        <AtelierDrop />
      </div>
      <AtelierFooter />
    </main>
  );
}
