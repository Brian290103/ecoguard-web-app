"use client";

import { ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dummyCommunities = [
  {
    id: 1,
    name: "Green Warriors",
    lastMessage: "Meeting tomorrow at 10 AM",
    avatar: "GW",
  },
  {
    id: 2,
    name: "Ocean Cleanup Squad",
    lastMessage: "New cleanup event posted!",
    avatar: "OC",
  },
  {
    id: 3,
    name: "Tree Planters United",
    lastMessage: "Successfully planted 100 trees today",
    avatar: "TP",
  },
];

const Communities = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Communities</CardTitle>
          <CardDescription>Your environmental groups</CardDescription>
        </div>
        <CardAction className="text-sm text-blue-600 hover:underline cursor-pointer">
          View All
        </CardAction>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {dummyCommunities.map((community) => (
            <li
              key={community.id}
              className="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
            >
              <Avatar className="h-12 w-12 flex items-center justify-center bg-green-100 text-green-700">
                {community.avatar}
              </Avatar>
              <div className="flex-1">
                <h1 className="font-medium">{community.name}</h1>
                <p className="text-sm text-gray-500">{community.lastMessage}</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Communities;
