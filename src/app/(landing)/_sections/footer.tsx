import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { name: "Twitter", icon: <Twitter className="h-6 w-6" />, href: "#" },
    { name: "Facebook", icon: <Facebook className="h-6 w-6" />, href: "#" },
    { name: "Instagram", icon: <Instagram className="h-6 w-6" />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin className="h-6 w-6" />, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="text-2xl font-bold text-green-500">EcoGuard</span>
            <p className="text-gray-400 text-base">
              Empowering communities to protect our planet.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  EcoGuard
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#about"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Contact
                    </Link>
                  </li>
                  {/* Add actual links later */}
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Features
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#features"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Reporting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#features"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#gamification"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Gamification
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} EcoGuard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
