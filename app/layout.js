import { Playfair_Display } from "next/font/google";
import "./_style/globals.css";
import Image from "next/image";
import background from "@/public/background.jpg";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Plant desease identifier",
  description: "Generate info about plant condition",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.className} relative min-h-screen`}>
      <div className="absolute bottom-[25px] left-[25px] right-[25px] top-[25px] rounded-2xl  border-r-2 border-t-2 border-white/40 bg-white/20 shadow-2xl flex items-center justify-center">
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
      </div>
      </body>
    </html>
  );
}
