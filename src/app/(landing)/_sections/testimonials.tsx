import Image from "next/image";

const testimonials = [
  {
    quote:
      "I reported an illegal dumpsite near my home, and it was cleaned up within a week! It's amazing to see my actions have a direct impact.",
    name: "Alex",
    role: "Eco-Citizen, Nairobi",
    avatar: "/images/user.png",
  },
  {
    quote:
      "EcoGuard helps us discover and coordinate conservation efforts we would have otherwise missed. It's a game-changer for grassroots action.",
    name: "Dr. Imani",
    role: "Wildlife Biologist, KWS",
    avatar: "/images/organization.png",
  },
  {
    quote:
      "The prioritized alert system is incredibly efficient. We can respond to urgent public safety and environmental issues faster than ever.",
    name: "Officer Miller",
    role: "City Environmental Dept.",
    avatar: "/images/authority.png",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Our Heroes Are Saying
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root sm:mt-20">
          <div className="-m-4 grid grid-cols-1 gap-8 p-4 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="flex flex-col rounded-lg bg-white dark:bg-black p-8 shadow-lg border border-gray-100 dark:border-gray-800"
              >
                <div className="flex-grow">
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <footer className="mt-8 flex items-center gap-x-4">
                  <Image
                    className="h-12 w-12 rounded-full bg-gray-50 dark:invert"
                    src={testimonial.avatar}
                    alt={`Avatar of ${testimonial.name}`}
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
