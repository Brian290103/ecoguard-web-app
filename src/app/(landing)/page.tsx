import CoreFeatures from "./_sections/core-features";
import CTA from "./_sections/cta";
import Footer from "./_sections/footer";
import GamificationImpact from "./_sections/gamification-impact";
import HeroSection from "./_sections/hero";
import HowItWorks from "./_sections/how-it-works";
import Navbar from "./_sections/navbar";
import ProblemSolution from "./_sections/problem-solution";
import SocialProof from "./_sections/social-proof";
import Testimonials from "./_sections/testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      {/*<SocialProof />*/}
      <ProblemSolution />
      <HowItWorks />
      <CoreFeatures />
      <GamificationImpact />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
