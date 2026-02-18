import DoctorDiagnosis from '@/components/doctor/DoctorDiagnosis';
import DoctorLab from '@/components/doctor/DoctorLab';
import DoctorTransformation from '@/components/doctor/DoctorTransformation';
import DoctorMolecule from '@/components/doctor/DoctorMolecule';
import DoctorProduct from '@/components/doctor/DoctorProduct';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <DoctorDiagnosis />
      <DoctorLab />
      <DoctorTransformation />
      <DoctorMolecule />
      <DoctorProduct />
    </main>
  );
}
