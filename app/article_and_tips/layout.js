import { Lora } from "next/font/google";
import Navigation from "../_components/Navigation";

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

function Layout({ children }) {
  return (
    <>
      <div
        className={`${lora.className} absolute bottom-[25px] left-[25px] right-[25px] top-[25px] rounded-2xl border-r-2 border-t-2 border-white/40 bg-white/20 shadow-2xl text-white backdrop-blur-xl overflow-auto text-xl`}>
        {children}
      </div>
      <Navigation />
    </>
  );
}

export default Layout;
