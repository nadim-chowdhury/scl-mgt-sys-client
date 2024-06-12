import { testimonials } from "@/utils/testimonials";
import Image from "next/image";

export default function Testimonials() {
  return (
    <div className="py-20 container mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Testimonials</h2>
        <p className="mt-4 text-lg text-gray-600">
          Hear from our satisfied users and see how our system has made a
          difference for them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-gray-100 rounded-lg  p-6 text-center"
          >
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              width={1280}
              height={720}
            />
            <h3 className="text-xl font-bold text-amber-500 mb-1">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{testimonial.position}</p>
            <p className="text-gray-600 italic">
              &quot;{testimonial.quote}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
