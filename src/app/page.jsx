import BenefitsSection from "../components/landing-page/BenefitsSection";
import FeaturesSection from "../components/landing-page/FeaturesSection";
import HeroSection from "../components/landing-page/HeroSection";
import Testimonials from "../components/landing-page/Testimonials";
import PricingSection from "../components/landing-page/PricingSection";
import FAQSection from "../components/landing-page/FAQSection";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <Testimonials />
      {/* <ProductDemosSection /> */}
      <PricingSection />
      {/* <IntegrationSection /> */}
      <FAQSection />
      {/* <ContactSection /> */}
      <Footer />
    </main>
  );
}
