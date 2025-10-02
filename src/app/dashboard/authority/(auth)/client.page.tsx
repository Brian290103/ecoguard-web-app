"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavTitleStore } from "@/store/nav-title-store";
import { useEffect } from "react";

type Tab = {
  title: string;
  value: string;
  content: React.ReactNode;
};

type ClientPageProps = {
  tabs: Tab[];
};

export function ClientPage({ tabs }: ClientPageProps) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className="w-full">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="py-3">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
