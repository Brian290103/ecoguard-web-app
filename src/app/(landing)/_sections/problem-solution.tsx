import {
  AlertTriangle,
  GitPullRequestClosed,
  Goal,
  Send,
  ShieldCheck,
  Users,
  UserX,
} from "lucide-react";

const ProblemSolution = () => {
  const problems = [
    {
      icon: <GitPullRequestClosed className="h-8 w-8 text-red-500" />,
      title: "Fragmented Reporting",
      description:
        "Environmental issues go unreported or get lost in complex bureaucratic channels, leading to inaction.",
    },
    {
      icon: <Users className="h-8 w-8 text-red-500" />,
      title: "Lack of Coordination",
      description:
        "Citizens, authorities, and NGOs often work in silos, resulting in duplicated efforts and wasted resources.",
    },
    {
      icon: <UserX className="h-8 w-8 text-red-500" />,
      title: "Limited Engagement",
      description:
        "Many people feel their individual efforts are insignificant, leading to a sense of powerlessness and apathy.",
    },
  ];

  const solutions = [
    {
      icon: <Send className="h-8 w-8 text-green-500" />,
      title: "For Citizens",
      description:
        "Report issues in seconds and see the real-world impact of your actions.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
      title: "For Authorities",
      description:
        "Receive clear, geo-tagged, and prioritized alerts to enable swift and effective responses.",
    },
    {
      icon: <Goal className="h-8 w-8 text-green-500" />,
      title: "For Organizations",
      description:
        "Discover, manage, and showcase conservation projects that align with your mission.",
    },
  ];

  return (
    <section id="problem-solution" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {/* Problem Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Disconnected Efforts, Unseen Issues.
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            The path to environmental action is often blocked by common
            challenges.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {problems.map((problem, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                {problem.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                {problem.title}
              </h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Your Unified Platform for Environmental Action.
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            EcoGuard bridges the gap, connecting everyone to a single,
            streamlined ecosystem.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                {solution.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                {solution.title}
              </h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
