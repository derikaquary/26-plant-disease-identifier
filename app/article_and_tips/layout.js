import { Playfair_Display } from "next/font/google";
import Navigation from "../_components/Navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

function Layout({ children }) {
  return (
    <div
      className={`${playfair.className} absolute bottom-[25px] left-[25px] right-[25px] top-[25px] rounded-2xl border-r-2 border-t-2 border-white/40 bg-white/20 shadow-2xl text-white backdrop-blur-xl px-2 py-2 overflow-auto text-2xl`}>
      {children}
      <Navigation />
    </div>
  );
}

export default Layout;
