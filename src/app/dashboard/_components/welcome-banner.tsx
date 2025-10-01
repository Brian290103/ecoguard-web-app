"use client";

import { List, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

const WelcomeBanner = () => {
  const { data: session } = authClient.useSession();
  return (
    <Card className="bg-primary">
      <CardContent>
        <div className="w-full flex items-center gap-3 justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <h1 className="text-xl">{session?.user?.name || "Guest"}</h1>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="default">
                <PlusCircle /> Create Report
              </Button>
              <Button size="sm" variant="outline">
                <List /> Past Reports
              </Button>
            </div>
          </div>

          <div className="flex flex-col relative items-center justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || "User"}
              />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
              <Badge variant="secondary">30ptns</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
