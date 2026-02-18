'use client';

import { useState } from 'react';
import TheEntrance from '@/components/salon/TheEntrance';
import TheJourney from '@/components/salon/TheJourney';
import TheMastery from '@/components/salon/TheMastery';
import TheInvitation from '@/components/salon/TheInvitation';

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505]">
      {!hasEntered && (
        <TheEntrance onEnter={() => setHasEntered(true)} />
      )}
      
      {hasEntered && (
        <>
          <TheJourney />
          <TheMastery />
          <TheInvitation />
        </>
      )}
    </main>
  );
}
