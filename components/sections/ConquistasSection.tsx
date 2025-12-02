'use client';

import { BarraConquistas } from '@/components/ui/BarraConquistas';

export function ConquistasSection() {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-blue-50 to-cyan-50 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <BarraConquistas />
      </div>
    </section>
  );
}
