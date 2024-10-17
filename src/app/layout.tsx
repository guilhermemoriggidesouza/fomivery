
import "~/styles/globals.css"
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { HydrateClient } from "~/trpc/server";
import { TRPCReactProvider } from "~/trpc/react";
import './global.css'

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" style={{ overflow: "hidden" }}>
      <body className={GeistSans.className} style={{ overflow: "hidden" }}>
        <TRPCReactProvider>
          <HydrateClient>
            {children}
          </HydrateClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
