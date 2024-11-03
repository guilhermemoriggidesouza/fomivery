
import "~/styles/globals.css"
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { HydrateClient } from "~/trpc/server";
import { TRPCReactProvider } from "~/trpc/react";
import { headers } from 'next/headers';
import './global.css'
import 'animate.css';

export const metadata: Metadata = {
  title: "Cardap-io",
  description: "Cardápio mais simples do Brasil!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const base = `${headers().get('x-forwarded-proto')}://${headers().get('host')}`;

  return (
    <html lang="en" style={{ overflow: "hidden" }}>
      <head>
        <link rel="manifest" href={`${base}/manifest.json`} />
        <script src={`${base}/pwaStart.js`} async/>
      </head>
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
