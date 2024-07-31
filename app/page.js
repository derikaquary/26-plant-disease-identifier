import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/app_page" className="h-[50px] w-[70px] bg-green-400">
        click here
      </Link>
    </main>
  );
}
