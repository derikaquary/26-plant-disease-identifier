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
  title: {
    default: "Plant Disease Identifier",
    template: "%s - Plant Disease Identifier",
  },
  description: "Generate info about plant disease and plant health condition",
  keywords:
    "Plant disease, plant condition, plant nutrition, plant minerals, minerals, pest, lant nutrient deficiency",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Metadata */}
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />

      {/* Open Graph Metadata */}
      <meta property="og:title" content="Plant Disease Check" />
      <meta
        property="og:description"
        content="Hi, go ahead and check your plant health using this app"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://plant-check.vercel.app" />
      <meta
        property="og:image"
        content="https://plant-check.vercel.app/caring_plants.jpeg"
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Plant Disease Check" />
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5933734292382802"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N289NWHH');
          `,
          }}
        />
      </head>
      <body className={`${lora.className} relative min-h-screen `}>
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N289NWHH"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
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
        <div className="fixed bottom-0 left-0 right-0 z-20 p-4 ad-container bg-white/70">
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
