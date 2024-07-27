import Link from "next/link";

export default function DemoRequest() {
  return (
    <div className="h-screen flex items-center">
      <div className="bg-amber-500 text-white grow flex justify-center">
        <Link href="/dashboard" className="hover:underline p-2">
          Return Dashboard
        </Link>
      </div>
    </div>
  );
}
