import {
  BrainCircuit,
  FileCheck2,
  LayoutDashboard,
  Trophy,
  Users2,
} from "lucide-react";

const features = [
  {
    name: "Powerful Reporting",
    description:
      "Geo-tagged reports with photos, videos, and priority levels to ensure rapid and appropriate responses.",
    icon: <FileCheck2 className="h-6 w-6" />,
  },
  {
    name: "Community Collaboration",
    description:
      "Join local and topic-based communities, create events, and discuss solutions with fellow eco-heroes.",
    icon: <Users2 className="h-6 w-6" />,
  },
  {
    name: "AI-Powered Learning",
    description:
      "Access a library of expert resources and get instant answers from our AI assistant to grow your knowledge.",
    icon: <BrainCircuit className="h-6 w-6" />,
  },
  {
    name: "Gamified Engagement",
    description:
      "Earn points, unlock badges, and climb the leaderboards by taking meaningful environmental action.",
    icon: <Trophy className="h-6 w-6" />,
  },
  {
    name: "Role-Based Dashboards",
    description:
      "Tailored tools and dashboards for citizens, authorities, and organizations to maximize their specific impact.",
    icon: <LayoutDashboard className="h-6 w-6" />,
  },
];

const CoreFeatures = () => {
  return (
    <section
      id="features"
      className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">
            Core Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            All The Tools You Need to Make a Difference
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            EcoGuard provides a comprehensive suite of features designed for
            maximum impact and engagement.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 text-white">
                    {feature.icon}
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
