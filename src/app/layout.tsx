import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/navigation/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ViewTransitions } from "next-view-transitions";

const ibm = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Hekima",
    default: "Home | Hekima",
  },
  description: "Your modern solution for student performance analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={ibm.className}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryProvider>
          <Toaster richColors />
        </body>
      </html>
    </ViewTransitions>
  );
}
