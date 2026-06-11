import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Premium Courses | Upgrade Your Skills",
  description: "Learn Web Development, DevOps, Blockchain, and Java Spring Boot with our comprehensive 0-100 cohorts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 140px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
