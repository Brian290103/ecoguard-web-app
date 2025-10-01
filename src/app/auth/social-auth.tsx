"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const SocialAuth = () => {
  const pathName = usePathname();
  return (
    <>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background/80 text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <div
        className={`grid grid-cols-1 ${pathName === "/auth/sign-up" && "md:grid-cols-2"} gap-4`}
      >
        <Button variant="outline" type="button" className="w-full">
          <Image
            alt="Google Icon"
            src="/images/brands/google.png"
            className=""
            width={20}
            height={20}
          />
          <span className="">Continue with Google</span>
        </Button>
        <Button variant="outline" type="button" className="w-full">
          <Image
            alt="Google Icon"
            src="/images/brands/meta.png"
            className=""
            width={20}
            height={20}
          />
          <span className="">Continue with Meta</span>
        </Button>
      </div>
    </>
  );
};

export default SocialAuth;
