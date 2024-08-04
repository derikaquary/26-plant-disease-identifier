import { Playfair_Display } from "next/font/google";
import "./_style/globals.css";
import Image from "next/image";
import Script from "next/script"; // Import Script component
import background from "@/public/background.jpg";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
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
          strategy="afterInteractive" // Ensure the script runs after the page is interactive
        />
      </head>
      <body className={`${playfair.className} relative min-h-screen`}>
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
        <main>{children}</main>
      </body>
    </html>
  );
}
