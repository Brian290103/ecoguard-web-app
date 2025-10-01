import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Empower Your Community, Protect Our Planet.
        </h1>
        <p className="mt-6 text-lg text-gray-200 md:text-xl">
          The all-in-one platform to report environmental issues, connect with
          local heroes, and drive real, measurable change. Your action,
          amplified.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/auth/sign-up">Join the Movement</Link>
          </Button>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="#how-it-works">See It in Action</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
