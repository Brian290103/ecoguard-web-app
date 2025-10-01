import { Camera, CheckCircle2, Network } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Camera className="h-10 w-10 text-green-600" />,
      name: "1. Spot & Report",
      description:
        "See an issue? Use the app to report it in seconds with photos, location, and priority.",
    },
    {
      icon: <Network className="h-10 w-10 text-green-600" />,
      name: "2. Connect & Collaborate",
      description:
        "Your report instantly notifies the right local authorities and organizations, who can claim and manage the issue.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-green-600" />,
      name: "3. Resolve & See Impact",
      description:
        "Track the progress in real-time and get notified when the issue is resolved. See your contribution make a difference.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="bg-white dark:bg-black py-16 sm:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            How It Works
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            From Report to Resolution in 3 Simple Steps
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Our streamlined process makes environmental action easy,
            transparent, and impactful.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {steps.map((step) => (
              <div key={step.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                  {step.icon}
                  {step.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">{step.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
