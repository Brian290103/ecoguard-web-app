import Image from "next/image";

const SocialProof = () => {
  const logos = [
    { src: "/images/brands/google.png", alt: "Google" },
    { src: "/images/brands/meta.png", alt: "Meta" },
    {
      src: "/images/organization.png",
      alt: "Sample Organization",
      className: "dark:invert",
    },
    {
      src: "/images/authority.png",
      alt: "Sample Authority",
      className: "dark:invert",
    },
  ];

  return (
    <section
      id="social-proof"
      className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-wider uppercase">
          In partnership with leading organizations
        </h2>
        <div className="mt-8 flow-root">
          <div className="-mt-4 -ml-8 flex flex-wrap justify-center lg:-ml-4">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="mt-4 ml-8 flex flex-grow flex-shrink-0 items-center justify-center lg:ml-4 lg:flex-grow-0"
              >
                <Image
                  className={`h-12 w-auto object-contain ${logo.className || ""}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={158}
                  height={48}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
