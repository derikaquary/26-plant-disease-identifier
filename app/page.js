
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <p className="text-white text-5xl">Welcome to PDC</p>
      <p className="text-white">Plant Disease Check</p>
      <div className="bg-white/40 px-3 py-3 rounded-2xl">
        <Link href="/plant_analyzer">
          <a className="bg-white text-3xl px-2 rounded-xl">click here</a>
        </Link>
      </div>
    </div>
  )
}