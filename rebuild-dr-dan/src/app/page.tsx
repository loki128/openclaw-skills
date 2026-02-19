import ExperienceOpening from '@/components/experience/ExperienceOpening';
import ExperienceIron from '@/components/experience/ExperienceIron';
import ExperienceMolecule from '@/components/experience/ExperienceMolecule';
import ExperienceLab from '@/components/experience/ExperienceLab';
import ExperienceStory from '@/components/experience/ExperienceStory';
import ExperienceProduct from '@/components/experience/ExperienceProduct';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <ExperienceOpening />
      <ExperienceIron />
      <ExperienceMolecule />
      <ExperienceLab />
      <ExperienceStory />
      <ExperienceProduct />
    </main>
  );
}
