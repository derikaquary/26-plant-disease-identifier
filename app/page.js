import Link from "next/link";

export default function Home() {
  return (
    <div className="absolute bottom-[25px] left-[25px] right-[25px] top-[25px] rounded-2xl border-r-2 border-t-2 border-white/40 bg-white/20 shadow-2xl flex flex-col gap-4 justify-center items-center">
      <p className="text-white text-center text-5xl">Welcome to PDC</p>
      <p className="text-white">Plant Disease Check</p>
      <div className="bg-white/40 px-3 py-3 rounded-2xl">
        <Link
          href="/plant_analyzer"
          className="bg-white text-3xl px-2 rounded-xl">
          click here
        </Link>
      </div>
    </div>
  );
}
