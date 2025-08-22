import "~/styles/globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { headers } from "next/headers";
import { BreadCrumbs } from "~/components/breadcrumber";
import { AppSidebar } from "~/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const base = `${headers().get("x-forwarded-proto")}://${headers().get("host")}`;

  return (
    <html>
      {process.env.NODE_ENV != "development" && (
        <>
          <SpeedInsights />
          <Analytics />
        </>
      )}
      <head>
        <link rel="manifest" href={`${base}/manifest.json`} />
        <script src={`${base}/pwaStart.js`} async />
      </head>
      <body
        className={`${GeistSans.className} safari_only`}
        style={{ overflow: "hidden" }}
      >
        <TRPCReactProvider>

          <ClerkProvider>
            <SidebarProvider>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <AppSidebar />
              <main className="w-full">
                <div className="flex items-center">
                  <SidebarTrigger />
                  <BreadCrumbs />
                </div>
                <HydrateClient>{children}</HydrateClient>
              </main>
            </SidebarProvider>
            {children}
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
