import Link from "next/link";
import { dashboardCards } from "@/utils/dashboardcards-demo-data";
import Heading from "@/components/Heading";

export default function DashboardHome() {
  return (
    <div>
      <Heading title="Welcome to the Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <div key={index} className="border p-4 rounded-lg bg-amber-50">
            <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
            <p className="text-gray-600">{card.description}</p>
            <Link href={card.link}>
              <span className="text-amber-600 hover:underline mt-2 inline-block">
                {card.linkText}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
