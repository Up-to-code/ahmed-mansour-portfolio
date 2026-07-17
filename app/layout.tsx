import type { Metadata } from "next";
import { Geist, Geist_Mono, Rubik } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const rubik = Rubik({ variable: "--font-rubik", subsets: ["arabic", "latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const ogImage = new URL("/og.png", `${protocol}://${host}`).toString();

  return {
    title: "Ahmed Mansour — Solo Founder & Full-Stack Builder",
    description: "I turn ideas into products and products into businesses—owning strategy, design, engineering, launch, and growth.",
    openGraph: {
      title: "Ahmed Mansour — Solo Founder & Full-Stack Builder",
      description: "From first idea to real users: product strategy, design, engineering, launch, and growth.",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: "Ahmed Mansour — Solo Founder & Full-Stack Builder" }],
    },
    twitter: { card: "summary_large_image", images: [ogImage] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable} ${rubik.variable}`}>{children}</body></html>;
}
