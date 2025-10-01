import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section
      id="cta"
      className="relative bg-cover bg-center py-20 sm:py-28"
      style={{ backgroundImage: "url('/images/forest.jpg')" }}
    >
      <div className="absolute inset-0 bg-green-900/70 backdrop-blur-sm" />
      <div className="relative container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Become an Eco-Hero?
        </h2>
        <p className="mt-6 text-lg leading-8 text-green-100 max-w-2xl mx-auto">
          Join thousands of users making a tangible difference in their
          communities. Sign up today and start your journey towards a cleaner,
          greener planet.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">Sign Up for Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
