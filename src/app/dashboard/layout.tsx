import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import LogoutModal from "@/components/logout-modal";
import { OneSignalWrapper } from "@/components/one-signal-wrapper";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { AppSidebar } from "./_components/app-sidebar";
import { SiteHeader } from "./_components/site-header";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <OneSignalWrapper userId={session.user.id}>
      <LogoutModal />
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </OneSignalWrapper>
  );
};

export default Layout;
