const plans = [
  {
    id: 1,
    name: "Basic",
    price: "$49",
    description: "Essential features for small schools.",
    features: ["Student Management", "Teacher Management", "Class Scheduling"],
    popular: false,
  },
  {
    id: 2,
    name: "Pro",
    price: "$99",
    description: "Advanced features for medium-sized schools.",
    features: [
      "All Basic Features",
      "Attendance Tracking",
      "Parent Communication",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Contact Us",
    description: "Comprehensive features for large institutions.",
    features: ["All Pro Features", "Custom Integrations", "Priority Support"],
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold ">Pricing Plans</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that&apos;s right for your school.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg  p-6 ${
                plan.popular ? "border-4 border-amber-500" : ""
              }`}
            >
              <h3 className="text-2xl font-bold  mb-4 text-center">
                {plan.name}
              </h3>
              <p className="text-center text-gray-600 mb-6">{plan.price}</p>
              <p className="text-center text-gray-500 mb-6">
                {plan.description}
              </p>
              <div className="text-gray-600 mb-6">
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="mb-2 flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6 text-amber-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <a
                  href="/sign-up"
                  className={`${
                    plan.popular ? "bg-amber-500" : "bg-gray-700"
                  } hover:bg-amber-700 text-white font-bold py-2 px-4 rounded`}
                >
                  {plan.popular ? "Most Popular" : "Select Plan"}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold  mb-4">Special Offers</h3>
          <p className="text-lg text-gray-600">
            Sign up now and get 20% off your first year! Use code:{" "}
            <span className="font-bold">SCHOOL20</span>
          </p>
        </div>
      </div>
    </section>
  );
}
