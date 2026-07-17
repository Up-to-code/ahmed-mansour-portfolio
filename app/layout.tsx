import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const ogImage = new URL("/og.png", `${protocol}://${host}`).toString();

  return {
    title: "Ahmed Mansour — Full-Stack Founder Partner",
    description: "I build the business inside the product — full-stack engineering, product strategy, design, growth, and analytics.",
    openGraph: {
      title: "Ahmed Mansour — I build the business inside the product",
      description: "Full-stack engineering, product strategy, design, growth, and analytics.",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Ahmed Mansour — Full-Stack Founder Partner" }],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
