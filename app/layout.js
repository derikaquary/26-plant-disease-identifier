import { Lora } from "next/font/google";
import "./_style/globals.css";
import Image from "next/image";
import Script from "next/script"; // Import Script component
import background from "@/public/background.jpg";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Plant disease identifier",
  description: "Generate info about plant condition",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5933734292382802"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${lora.className} relative min-h-screen `}>
        <div className="absolute inset-0">
          <Image
            src={background}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            alt="night sky"
            className="absolute inset-0 object-cover brightness-100"
          />
        </div>
        {/* Main Content with padding to accommodate the ad */}
        <main className="relative z-10 pb-20 min-h-[calc(100vh-80px)]">
          {children}
        </main>
        {/* Ad Container */}
        <div className="ad-container fixed bottom-0 left-0 right-0 p-4 bg-white/70 z-20">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5933734292382802"
            data-ad-slot="your-ad-slot-id"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </body>
    </html>
  );
}
