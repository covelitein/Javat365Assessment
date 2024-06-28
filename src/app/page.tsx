import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen gap-5 text-white">
      <Link
        href={"/auth/signin"}
        className="bg-blue-600 text-lg px-8 py-2 rounded-lg"
      >
        Sign In
      </Link>
      <Link
        href={"/auth/signup"}
        className="bg-blue-600 text-lg px-8 py-2 rounded-lg"
      >
        Sign Up
      </Link>
    </main>
  );
}
