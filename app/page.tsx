"use client";

import { useModal } from "@/hooks/useModal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import BendAccuracyDemo from "@/components/BendAccuracyDemo";
import Benefits from "@/components/Benefits";
import EarlyAccessCTA from "@/components/EarlyAccessCTA";
import EarlyAccessModal from "@/components/EarlyAccessModal";
import Footer from "@/components/Footer";
import BeforeAfter from "@/components/BeforeAfter";

export default function Home() {
  const modal = useModal();

  return (
    <>
      <Header onCtaClick={modal.open} />

      <main className="flex-1">
        <Hero onCtaClick={modal.open} />
        <ProblemSection />
        <HowItWorks />
        <BendAccuracyDemo />
        <BeforeAfter />
        <Benefits />

        <EarlyAccessCTA onCtaClick={modal.open} />
      </main>

      <Footer onCtaClick={modal.open} />

      <EarlyAccessModal isOpen={modal.isOpen} onClose={modal.close} />
    </>
  );
}