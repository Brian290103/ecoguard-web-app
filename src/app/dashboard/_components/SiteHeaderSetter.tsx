"use client";

import { useNavTitleStore } from "@/store/nav-title-store";
import { useEffect } from "react";

export const SiteHeaderSetter = ({ title }: { title: string }) => {
  const { setTitle } = useNavTitleStore();
  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);
  return null;
};
