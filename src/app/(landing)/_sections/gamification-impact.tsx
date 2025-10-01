import { Award, Shield, Star, Trophy } from "lucide-react";
import Image from "next/image";

const GamificationImpact = () => {
  return (
    <section
      id="gamification"
      className="bg-white dark:bg-black py-16 sm:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="text-base font-semibold leading-7 text-green-600">
              Gamification & Impact
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Track Your Impact, Inspire Change
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              With EcoGuard, every action counts. Our gamification system
              rewards your contributions, from submitting reports to completing
              educational quizzes. Watch your impact grow and compete with
              friends to become an Eco-Hero.
            </p>
            <dl className="mt-10 space-y-8 text-base leading-7 text-gray-600 dark:text-gray-400 lg:max-w-none">
              <div className="relative pl-9">
                <dt className="inline font-semibold text-gray-900 dark:text-white">
                  <Trophy
                    className="absolute left-1 top-1 h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  Earn Points & Rewards.
                </dt>{" "}
                <dd className="inline">
                  Gain points for positive actions and climb the leaderboards.
                </dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-gray-900 dark:text-white">
                  <Award
                    className="absolute left-1 top-1 h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  Unlock Badges.
                </dt>{" "}
                <dd className="inline">
                  Achieve milestones and earn badges to showcase on your
                  profile.
                </dd>
              </div>
              <div className="relative pl-9">
                <dt className="inline font-semibold text-gray-900 dark:text-white">
                  <Star
                    className="absolute left-1 top-1 h-5 w-5 text-green-600"
                    aria-hidden="true"
                  />
                  Visualize Your Contribution.
                </dt>{" "}
                <dd className="inline">
                  Your Personal Impact Score reflects your overall positive
                  effect.
                </dd>
              </div>
            </dl>
          </div>

          {/* Visual Mock-up */}
          <div className="flex items-center justify-center mt-10 lg:mt-0">
            <div className="w-full max-w-sm rounded-xl bg-gray-50 dark:bg-gray-900 p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/images/user.png"
                  alt="User Avatar"
                  width={96}
                  height={96}
                  className="rounded-full ring-4 ring-green-500/50"
                />
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                  Eco-Citizen Alex
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Joined 2 months ago
                </p>

                <div className="mt-6 w-full">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Personal Impact Score
                  </p>
                  <p className="text-5xl font-bold text-green-600">1,250</p>
                </div>

                <div className="mt-8 w-full">
                  <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    Recent Badges
                  </p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-500">
                        <Trophy />
                      </div>
                      <span className="text-xs text-gray-500">Top 10%</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                        <Shield />
                      </div>
                      <span className="text-xs text-gray-500">5 Reports</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-500">
                        <Star />
                      </div>
                      <span className="text-xs text-gray-500">Community</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GamificationImpact;
