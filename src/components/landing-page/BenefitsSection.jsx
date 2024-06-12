import { benefits } from "@/utils/benefits";
import Image from "next/image";

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Key Benefits
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover how our system can improve your school&apos;s efficiency,
            enhance learning, and simplify management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-lg p-6 text-center"
            >
              <Image
                src={benefit.icon}
                alt={benefit.title}
                className="w-12 h-12 mx-auto mb-4 rounded-md object-cover"
                width={1280}
                height={720}
              />
              <h3 className="text-xl font-bold text-amber-500 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
