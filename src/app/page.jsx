import BenefitsSection from "@/components/landing-page/BenefitsSection";
import ContactSection from "@/components/landing-page/ContactSection";
import FAQSection from "@/components/landing-page/FAQSection";
import FeaturesSection from "@/components/landing-page/FeaturesSection";
// import FooterSection from "@/components/landing-page/FooterSection";
import HeroSection from "@/components/landing-page/HeroSection";
import IntegrationSection from "@/components/landing-page/IntegrationSection";
import PricingSection from "@/components/landing-page/PricingSection";
import ProductDemosSection from "@/components/landing-page/ProductDemosSection";
import Testimonials from "@/components/landing-page/Testimonials";
import Footer from "@/components/common/Footer";

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
